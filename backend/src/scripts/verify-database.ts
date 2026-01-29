import { supabase, TABLES } from '../config/database';

async function verifyDatabase() {
  console.log('\n📊 VERIFYING DATABASE STATE...\n');

  // Get all problem statements
  const { data: ps, error: psError } = await supabase
    .from(TABLES.PROBLEM_STATEMENTS)
    .select('*')
    .order('ps_code');

  if (psError) {
    console.error('❌ Error fetching problem statements:', psError);
    return;
  }

  console.log('Problem Statements in Database:');
  console.log('═'.repeat(80));
  
  ps.forEach(p => {
    const status = p.is_frozen ? '🔒 FROZEN' : '✅ Available';
    console.log(`${status} | ${p.ps_code} | Count: ${p.team_count}/${p.max_teams} | ID: ${p.id.substring(0, 8)}...`);
  });

  console.log('═'.repeat(80));

  // Get all teams
  const { count: teamCount, error: teamError } = await supabase
    .from(TABLES.TEAMS)
    .select('*', { count: 'exact', head: true });

  if (!teamError) {
    console.log(`\n📋 Total Teams Registered: ${teamCount || 0}`);
  }

  // Get teams by PS
  const { data: teams, error: teamsError } = await supabase
    .from(TABLES.TEAMS)
    .select('problem_statement_id');

  if (!teamsError && teams) {
    console.log('\n📍 Teams Distribution:');
    const distribution = {};
    teams.forEach(t => {
      const psId = t.problem_statement_id;
      distribution[psId] = (distribution[psId] || 0) + 1;
    });

    ps.forEach(p => {
      const actualCount = distribution[p.id] || 0;
      const dbCount = p.team_count;
      const match = actualCount === dbCount ? '✅' : '❌ MISMATCH';
      console.log(`  ${p.ps_code}: DB shows ${dbCount}, Actual teams: ${actualCount} ${match}`);
    });
  }

  console.log('\n✅ Verification complete!\n');
  process.exit(0);
}

verifyDatabase();
