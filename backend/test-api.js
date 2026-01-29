#!/usr/bin/env node

/**
 * Simple test script to verify backend is working
 * Run: node backend/test-api.js
 */

const baseURL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testing AIAgenthon Backend API\n');

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing Health Check...');
    const response = await fetch(`${baseURL}/health`);
    const data = await response.json();
    
    if (data.success) {
      console.log('   ✅ Health check passed');
      console.log(`   📅 Server time: ${data.timestamp}`);
      console.log(`   🌍 Environment: ${data.environment}\n`);
    } else {
      console.log('   ❌ Health check failed\n');
      return;
    }
  } catch (error) {
    console.log('   ❌ Backend not running or unreachable');
    console.log('   💡 Make sure to run: cd backend && npm run dev\n');
    return;
  }

  // Test 2: Get Problem Statements
  try {
    console.log('2️⃣ Testing Problem Statements Endpoint...');
    const response = await fetch(`${baseURL}/api/problem-statements`);
    const data = await response.json();
    
    if (data.success && data.data) {
      console.log(`   ✅ Found ${data.data.length} problem statements`);
      
      // Show summary
      const available = data.data.filter(ps => !ps.is_frozen).length;
      const frozen = data.data.filter(ps => ps.is_frozen).length;
      
      console.log(`   📊 Available: ${available}, Frozen: ${frozen}`);
      
      // Show first 3 PSs
      console.log('\n   Sample Problem Statements:');
      data.data.slice(0, 3).forEach(ps => {
        const status = ps.is_frozen ? '❄️ FROZEN' : '✅ Available';
        console.log(`   - ${ps.ps_code}: ${ps.category} (${ps.team_count}/${ps.max_teams}) ${status}`);
      });
      console.log('');
    } else {
      console.log('   ❌ No problem statements found');
      console.log('   💡 Did you run backend/database/setup.sql in Supabase?\n');
      return;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
    return;
  }

  // Test 3: Check Email (should be available)
  try {
    console.log('3️⃣ Testing Email Check Endpoint...');
    const response = await fetch(`${baseURL}/api/teams/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });
    const data = await response.json();
    
    if (data.success) {
      console.log(`   ✅ Email check working`);
      console.log(`   📧 test@example.com is ${data.data.available ? 'available' : 'taken'}\n`);
    } else {
      console.log('   ❌ Email check failed\n');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}\n`);
  }

  console.log('✨ All tests completed!\n');
  console.log('Next steps:');
  console.log('1. Open http://localhost:8080 in your browser');
  console.log('2. Click the "Register" button');
  console.log('3. Fill out the form and submit');
  console.log('4. Check Supabase dashboard to see your registration\n');
}

testAPI().catch(console.error);
