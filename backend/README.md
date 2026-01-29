# AIAgenthon Backend API

## Overview
Robust, scalable backend API for team registration system with Supabase integration.

## Features
- ✅ Team registration with unique ID generation
- ✅ Problem statement selection with automatic freezing (max 3 teams per PS)
- ✅ Email uniqueness validation
- ✅ Rate limiting for DDoS protection
- ✅ CORS configuration
- ✅ Request validation with Zod
- ✅ Error handling
- ✅ Compression for optimized responses
- ✅ TypeScript for type safety
- ✅ Scalable architecture

## Tech Stack
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
ALLOWED_ORIGINS=http://localhost:5173
```

## Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id VARCHAR(255) UNIQUE NOT NULL,
  team_name VARCHAR(100) NOT NULL,
  team_leader_name VARCHAR(100) NOT NULL,
  team_leader_email VARCHAR(255) UNIQUE NOT NULL,
  institution VARCHAR(200) NOT NULL,
  team_members TEXT NOT NULL,
  problem_statement_id UUID NOT NULL REFERENCES problem_statements(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create problem_statements table
CREATE TABLE IF NOT EXISTS problem_statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ps_code VARCHAR(20) UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  team_count INTEGER DEFAULT 0,
  is_frozen BOOLEAN DEFAULT FALSE,
  max_teams INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_teams_email ON teams(team_leader_email);
CREATE INDEX idx_teams_ps_id ON teams(problem_statement_id);
CREATE INDEX idx_ps_frozen ON problem_statements(is_frozen);
CREATE INDEX idx_ps_code ON problem_statements(ps_code);

-- Insert problem statements
INSERT INTO problem_statements (ps_code, title, category, max_teams) VALUES
('AIAG01', 'Agentic AI–Enabled Multi-Tier Manufacturing Phantom Stock Management', 'Supply Chain', 3),
('AIAG02', 'Agentic AI–Enabled Dynamic Carbon Footprint Optimization for Global Logistics', 'Supply Chain', 3),
('AIAG03', 'Agentic AI–Enabled Counterfeit Parts Detection in After-Sales Networks', 'Supply Chain', 3),
('AIAG04', 'Agentic Hyperlocal Public Works Complaint Resolution Network', 'CivicTech', 3),
('AIAG05', 'Agentic AI–Enabled Pothole Repair Accountability System', 'CivicTech', 3),
('AIAG06', 'Agentic Tree-Lifecycle Stewardship and Community Engagement Network', 'CivicTech', 3),
('AIAG07', 'Intelligent Loan Structuring for Irregular-Income Workers', 'FinTech', 3),
('AIAG08', 'Real-Time Spending Anomaly Detection & Fraud Prevention Engine', 'FinTech', 3),
('AIAG09', 'Agentic Intelligent Investment Recommendation Engine (DRL-Powered)', 'FinTech', 3),
('AIAG10', 'Multi-Agent Drone Search & Rescue Coordination System', 'DisasterTech', 3),
('AIAG11', 'Agentic Rockfall Prediction & Open-Pit Mine Safety Monitoring', 'DisasterTech', 3),
('AIAG12', 'Automated Damage Assessment & Insurance Triage Agent System', 'DisasterTech', 3)
ON CONFLICT (ps_code) DO NOTHING;
```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### Get Problem Statements
```
GET /api/problem-statements
```

### Register Team
```
POST /api/teams/register
Content-Type: application/json

{
  "teamName": "Team Alpha",
  "teamLeaderName": "John Doe",
  "teamLeaderEmail": "john@example.com",
  "institution": "XYZ University",
  "teamMembers": "Alice, Bob, Charlie",
  "problemStatementId": "uuid-here"
}
```

### Check Email Availability
```
POST /api/teams/check-email
Content-Type: application/json

{
  "email": "test@example.com"
}
```

### Get Team by ID
```
GET /api/teams/:teamId
```

## Error Handling

All errors return JSON:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Rate Limiting
- Window: 15 minutes
- Max requests: 100 per IP
- Applies to all `/api/*` routes

## Security Features
- Helmet.js for security headers
- CORS with whitelist
- Request size limits (10kb)
- Input validation with Zod
- SQL injection prevention via Supabase
- Rate limiting for DDoS protection

## Deployment

For production deployment:
1. Set `NODE_ENV=production`
2. Configure allowed origins
3. Use process manager (PM2 recommended)
4. Enable HTTPS
5. Set up monitoring

## License
MIT
