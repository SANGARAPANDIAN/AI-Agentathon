import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing Supabase connection...\n');
console.log('URL:', process.env.SUPABASE_URL);
console.log('Key (first 20 chars):', process.env.SUPABASE_ANON_KEY?.substring(0, 20) + '...');
console.log('Key length:', process.env.SUPABASE_ANON_KEY?.length);
console.log('\nExpected key format: Should start with "eyJ" and be ~200+ characters long\n');

try {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  console.log('✅ Supabase client created successfully\n');
  console.log('Attempting to fetch problem statements...\n');

  const { data, error } = await supabase
    .from('problem_statements')
    .select('*')
    .order('ps_code');

  if (error) {
    console.error('❌ DATABASE ERROR:', error.message);
    console.error('Error details:', JSON.stringify(error, null, 2));
  } else {
    console.log(`✅ SUCCESS! Retrieved ${data.length} problem statements:\n`);
    data.forEach(ps => {
      console.log(`  [${ps.ps_code}] ${ps.title}`);
      console.log(`    Teams: ${ps.team_count}/${ps.max_teams} | Frozen: ${ps.is_frozen}\n`);
    });
  }
} catch (err) {
  console.error('❌ CONNECTION ERROR:', err.message);
  console.error('Full error:', err);
}
