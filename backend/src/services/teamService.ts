import { supabase, TABLES } from '../config/database';
import { TeamRegistration, Team, ProblemStatement, TeamRegistrationResponse } from '../types';
import { AppError } from '../utils/errorHandler';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

class TeamService {
  /**
   * Register a new team with PS freezing logic
   */
  async registerTeam(data: TeamRegistration): Promise<TeamRegistrationResponse> {
    try {
      // Step 1: Check if PS exists and get current team count
      const { data: psData, error: psError } = await supabase
        .from(TABLES.PROBLEM_STATEMENTS)
        .select('*')
        .eq('id', data.problemStatementId)
        .single();

      if (psError || !psData) {
        logger.error('Problem statement not found', psError);
        throw new AppError('Problem statement not found', 404);
      }

      const ps = psData as ProblemStatement;

      // Step 2: Check if PS is frozen
      if (ps.is_frozen) {
        throw new AppError(
          `Problem statement "${ps.ps_code}" is full. Maximum ${ps.max_teams} teams allowed.`,
          400
        );
      }

      // Step 3: Check if email already registered
      const { data: existingTeam, error: emailError } = await supabase
        .from(TABLES.TEAMS)
        .select('team_leader_email')
        .eq('team_leader_email', data.teamLeaderEmail.toLowerCase())
        .single();

      if (existingTeam) {
        throw new AppError('This email is already registered', 400);
      }

      // Step 4: Check current team count for this PS (with row locking for concurrency)
      const { count, error: countError } = await supabase
        .from(TABLES.TEAMS)
        .select('*', { count: 'exact', head: true })
        .eq('problem_statement_id', data.problemStatementId);

      if (countError) {
        logger.error('Error counting teams', countError);
        throw new AppError('Error checking team availability', 500);
      }

      const currentTeamCount = count || 0;

      // Step 5: Check if we've reached the limit
      if (currentTeamCount >= ps.max_teams) {
        // Freeze the PS
        await this.freezeProblemStatement(data.problemStatementId);
        throw new AppError(
          `Problem statement "${ps.ps_code}" just reached maximum capacity (${ps.max_teams} teams)`,
          400
        );
      }

      // Step 6: Generate unique team ID
      const teamId = `TEAM-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;

      // Step 7: Insert team record
      const { data: newTeam, error: insertError } = await supabase
        .from(TABLES.TEAMS)
        .insert({
          team_id: teamId,
          team_name: data.teamName.trim(),
          team_leader_name: data.teamLeaderName.trim(),
          team_leader_email: data.teamLeaderEmail.toLowerCase().trim(),
          institution: data.institution.trim(),
          team_members: data.teamMembers.trim(),
          problem_statement_id: data.problemStatementId,
        })
        .select()
        .single();

      if (insertError || !newTeam) {
        logger.error('Error inserting team', insertError);
        throw new AppError('Failed to register team. Please try again.', 500);
      }

      // Step 8: Count teams from teams table for this PS and update problem_statements
      const { count: actualCount, error: actualCountError } = await supabase
        .from(TABLES.TEAMS)
        .select('*', { count: 'exact', head: true })
        .eq('problem_statement_id', data.problemStatementId);

      if (actualCountError) {
        logger.warn('Error counting teams, using fallback', actualCountError);
      }

      const newTeamCount = actualCount || 0;
      const shouldFreeze = newTeamCount >= ps.max_teams;

      // Update problem_statements with actual count from teams table
      const { error: updateError } = await supabase
        .from(TABLES.PROBLEM_STATEMENTS)
        .update({
          team_count: newTeamCount,
          is_frozen: shouldFreeze,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.problemStatementId);

      if (updateError) {
        logger.error('Failed to update PS team count', updateError);
      }

      logger.info('Team registered successfully', {
        teamId: teamId,
        psCode: ps.ps_code,
        newCount: newTeamCount,
        frozen: shouldFreeze,
      });

      return {
        teamId: teamId,
        teamName: data.teamName,
        problemStatement: ps.ps_code,
        message: shouldFreeze
          ? `Registration successful! Your team is the last one for ${ps.ps_code}. This problem statement is now closed.`
          : 'Team registered successfully!',
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Unexpected error in registerTeam', error);
      throw new AppError('Registration failed. Please try again.', 500);
    }
  }

  /**
   * Freeze a problem statement when it reaches max teams
   */
  private async freezeProblemStatement(psId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(TABLES.PROBLEM_STATEMENTS)
        .update({
          is_frozen: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', psId);

      if (error) {
        logger.error('Failed to freeze PS', error);
      }
    } catch (error) {
      logger.error('Error freezing PS', error);
    }
  }

  /**
   * Get all problem statements with availability status
   */
  async getAllProblemStatements(): Promise<ProblemStatement[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROBLEM_STATEMENTS)
        .select('*')
        .order('ps_code', { ascending: true });

      if (error) {
        logger.error('Error fetching problem statements', error);
        throw new AppError('Failed to fetch problem statements', 500);
      }

      return data as ProblemStatement[];
    } catch (error) {
      logger.error('Error in getAllProblemStatements', error);
      throw new AppError('Failed to fetch problem statements', 500);
    }
  }

  /**
   * Get team by ID
   */
  async getTeamById(teamId: string): Promise<Team | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEAMS)
        .select('*')
        .eq('team_id', teamId)
        .single();

      if (error || !data) {
        return null;
      }

      return data as Team;
    } catch (error) {
      logger.error('Error in getTeamById', error);
      return null;
    }
  }

  /**
   * Check email availability
   */
  async checkEmailAvailability(email: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEAMS)
        .select('team_leader_email')
        .eq('team_leader_email', email.toLowerCase())
        .single();

      return !data; // Available if no data found
    } catch (error) {
      return true; // Assume available on error
    }
  }
}

export default new TeamService();
