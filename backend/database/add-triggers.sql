-- Automatic Team Count Update Triggers
-- Run this in Supabase SQL Editor to ensure team_count stays in sync

-- Function to update team count when a team is inserted
CREATE OR REPLACE FUNCTION update_team_count_on_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Increment team_count for the problem statement
  UPDATE problem_statements
  SET 
    team_count = team_count + 1,
    is_frozen = (team_count + 1 >= max_teams),
    updated_at = NOW()
  WHERE id = NEW.problem_statement_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update team count when a team is deleted
CREATE OR REPLACE FUNCTION update_team_count_on_delete()
RETURNS TRIGGER AS $$
BEGIN
  -- Decrement team_count for the problem statement
  UPDATE problem_statements
  SET 
    team_count = GREATEST(team_count - 1, 0),
    is_frozen = (GREATEST(team_count - 1, 0) >= max_teams),
    updated_at = NOW()
  WHERE id = OLD.problem_statement_id;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_update_team_count_insert ON teams;
DROP TRIGGER IF EXISTS trigger_update_team_count_delete ON teams;

-- Create trigger for INSERT
CREATE TRIGGER trigger_update_team_count_insert
AFTER INSERT ON teams
FOR EACH ROW
EXECUTE FUNCTION update_team_count_on_insert();

-- Create trigger for DELETE
CREATE TRIGGER trigger_update_team_count_delete
AFTER DELETE ON teams
FOR EACH ROW
EXECUTE FUNCTION update_team_count_on_delete();

-- Sync current counts (run this once to fix any existing discrepancies)
UPDATE problem_statements ps
SET team_count = (
  SELECT COUNT(*)
  FROM teams t
  WHERE t.problem_statement_id = ps.id
),
is_frozen = (
  SELECT COUNT(*) >= ps.max_teams
  FROM teams t
  WHERE t.problem_statement_id = ps.id
),
updated_at = NOW();

-- Verify the counts
SELECT 
  ps.ps_code,
  ps.team_count AS "Current Count",
  COUNT(t.id) AS "Actual Count",
  ps.max_teams AS "Max Teams",
  ps.is_frozen AS "Frozen"
FROM problem_statements ps
LEFT JOIN teams t ON t.problem_statement_id = ps.id
GROUP BY ps.id, ps.ps_code, ps.team_count, ps.max_teams, ps.is_frozen
ORDER BY ps.ps_code;
