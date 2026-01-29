import { supabase, TABLES } from '../config/database';

/**
 * Sync team counts from teams table to problem_statements table
 * Run this once to fix existing data
 */
async function syncTeamCounts() {
  try {
    console.log('🔄 Starting team count sync...\n');

    // Get all problem statements
    const { data: problemStatements, error: psError } = await supabase
      .from(TABLES.PROBLEM_STATEMENTS)
      .select('*')
      .order('ps_code');

    if (psError) {
      console.error('Error fetching problem statements:', psError);
      return;
    }

    console.log(`Found ${problemStatements.length} problem statements\n`);

    // Update each problem statement with actual team count
    for (const ps of problemStatements) {
      const { count, error: countError } = await supabase
        .from(TABLES.TEAMS)
        .select('*', { count: 'exact', head: true })
        .eq('problem_statement_id', ps.id);

      if (countError) {
        console.error(`❌ Error counting teams for ${ps.ps_code}:`, countError);
        continue;
      }

      const actualCount = count || 0;
      const shouldFreeze = actualCount >= ps.max_teams;

      // Update the problem statement
      const { data: updateData, error: updateError } = await supabase
        .from(TABLES.PROBLEM_STATEMENTS)
        .update({
          team_count: actualCount,
          is_frozen: shouldFreeze,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ps.id)
        .select();

      if (updateError) {
        console.error(`❌ Error updating ${ps.ps_code}:`, updateError);
        console.error('Update details:', { actualCount, shouldFreeze, psId: ps.id });
      } else if (!updateData || updateData.length === 0) {
        console.error(`⚠️ No rows updated for ${ps.ps_code} - possible RLS issue`);
      } else {
        const status = shouldFreeze ? '🔒 FROZEN' : '✅';
        console.log(`${status} ${ps.ps_code}: ${actualCount}/${ps.max_teams} teams`);
      }
    }

    console.log('\n✅ Sync completed!\n');
    process.exit(0);
  } catch (error) {
    console.error('Error during sync:', error);
    process.exit(1);
  }
}

// Run the sync
syncTeamCounts();
