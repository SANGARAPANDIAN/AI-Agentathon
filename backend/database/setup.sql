-- AIAgenthon Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (be careful with this in production!)
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS problem_statements CASCADE;

-- Create problem_statements table
CREATE TABLE problem_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ps_code VARCHAR(20) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  team_count INTEGER DEFAULT 0 CHECK (team_count >= 0),
  is_frozen BOOLEAN DEFAULT FALSE,
  max_teams INTEGER DEFAULT 3 CHECK (max_teams > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create teams table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id VARCHAR(255) UNIQUE NOT NULL,
  team_name VARCHAR(100) NOT NULL,
  team_leader_name VARCHAR(100) NOT NULL,
  team_leader_email VARCHAR(255) UNIQUE NOT NULL,
  institution VARCHAR(200) NOT NULL,
  team_members TEXT NOT NULL,
  problem_statement_id UUID NOT NULL REFERENCES problem_statements(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance optimization
CREATE INDEX idx_teams_email ON teams(team_leader_email);
CREATE INDEX idx_teams_ps_id ON teams(problem_statement_id);
CREATE INDEX idx_teams_created ON teams(created_at DESC);
CREATE INDEX idx_ps_frozen ON problem_statements(is_frozen);
CREATE INDEX idx_ps_code ON problem_statements(ps_code);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problem_statements_updated_at
    BEFORE UPDATE ON problem_statements
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert all 10 problem statements
INSERT INTO problem_statements (ps_code, title, max_teams) VALUES
('PS01', 'Agentic AI-Driven Website-Integrated Business Support System', 3),
('PS02', 'Agentic AI-Powered API for Contact Number Validation and WhatsApp Intelligence', 3),
('PS03', 'Agentic AI-Enabled Smart Billing System for Retail Environments', 3),
('PS04', 'Agentic AI–Enabled Image Processing–Based Bill Management System', 3),
('PS05', 'Agentic AI–Enhanced File Uploading Module for Mobile and Tablet Applications', 3),
('PS06', 'Agentic AI–Driven Passwordless Multi-App Authentication System', 3),
('PS07', 'Agentic AI–Driven DataTables Customization and Performance Optimization', 3),
('PS08', 'Agentic AI–Enabled User Restriction & Dynamic Role-Based Access Control (RBAC) System', 3),
('PS09', 'ERP-Grade Agentic AI–Powered Task & Workflow Management System', 3),
('PS10', 'Agentic AI–Driven Multi-Session Single Login with Forced Global Logout', 3)
ON CONFLICT (ps_code) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_statements ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to problem_statements"
ON problem_statements FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert to teams"
ON teams FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public read access to teams"
ON teams FOR SELECT
TO public
USING (true);

-- Grant permissions
GRANT SELECT ON problem_statements TO anon, authenticated;
GRANT SELECT, INSERT ON teams TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Verify the setup
SELECT 'Setup complete!' as status;
SELECT ps_code, title, team_count, is_frozen, max_teams FROM problem_statements ORDER BY ps_code;
