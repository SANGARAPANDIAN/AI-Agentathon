-- Fix RLS Policies to Allow Updates
-- Run this in Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to problem_statements" ON problem_statements;
DROP POLICY IF EXISTS "Allow public insert to teams" ON teams;
DROP POLICY IF EXISTS "Allow public read access to teams" ON teams;

-- Create new policies for problem_statements
CREATE POLICY "Allow public read access to problem_statements"
ON problem_statements FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public update to problem_statements"
ON problem_statements FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create new policies for teams
CREATE POLICY "Allow public insert to teams"
ON teams FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read access to teams"
ON teams FOR SELECT
TO public
USING (true);

-- Verify policies
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('problem_statements', 'teams')
ORDER BY tablename, policyname;
