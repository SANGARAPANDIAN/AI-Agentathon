import { z } from 'zod';

// Zod schemas for validation
export const TeamRegistrationSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters').max(100, 'Team name too long'),
  teamLeaderName: z.string().min(2, 'Leader name must be at least 2 characters').max(100, 'Leader name too long'),
  teamLeaderEmail: z.string().email('Invalid email address').max(255),
  institution: z.string().min(3, 'Institution name must be at least 3 characters').max(200),
  teamMembers: z.string().min(1, 'Please provide team member names').max(1000),
  problemStatementId: z.string().min(1, 'Please select a problem statement'),
});

export type TeamRegistration = z.infer<typeof TeamRegistrationSchema>;

// Database types
export interface Team {
  id: string;
  team_id: string;
  team_name: string;
  team_leader_name: string;
  team_leader_email: string;
  institution: string;
  team_members: string;
  problem_statement_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProblemStatement {
  id: string;
  ps_code: string;
  title: string;
  team_count: number;
  is_frozen: boolean;
  max_teams: number;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface TeamRegistrationResponse {
  teamId: string;
  teamName: string;
  problemStatement: string;
  message: string;
}
