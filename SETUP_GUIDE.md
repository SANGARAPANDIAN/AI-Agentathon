# 🚀 AIAgenthon Full Stack Setup Guide

## 📋 Overview

Complete MERN-based registration system with:
- ✅ **Frontend**: React + TypeScript + Vite + Tailwind CSS
- ✅ **Backend**: Node.js + Express + TypeScript
- ✅ **Database**: Supabase (PostgreSQL)
- ✅ **Features**: Team registration, PS selection with auto-freeze (max 3 teams/PS), email validation, rate limiting

---

## 🔧 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

---

## 🗄️ Database Setup

### Step 1: Run SQL in Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Copy and paste the entire content from `backend/database/setup.sql`
4. Click **Run** to execute

This will:
- Create `problem_statements` table with all 12 PSs
- Create `teams` table
- Set up indexes for performance
- Configure Row Level Security (RLS)
- Insert all problem statements

### Step 2: Verify Setup

Run this query in SQL Editor to verify:
```sql
SELECT ps_code, title, category, team_count, is_frozen, max_teams 
FROM problem_statements 
ORDER BY ps_code;
```

You should see all 12 problem statements (AIAG01-AIAG12).

---

## 🖥️ Backend Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

The `.env` file is already created with your credentials. Verify it contains:

```env
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://cigenkhmolwdlxrsibov.supabase.co
SUPABASE_ANON_KEY=sb_publishable_4sKcz7ickLeFFryDTXpvEQ_SNLzcZwo
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

### Step 3: Start Backend Server

```bash
npm run dev
```

Backend will run on: http://localhost:3001

#### Verify Backend:
Open browser: http://localhost:3001/health

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "...",
  "environment": "development"
}
```

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
# From root directory (e:\AIAgenthon)
npm install
```

### Step 2: Environment Configuration

The `.env` file is already created. Verify it contains:

```env
VITE_API_URL=http://localhost:3001
```

### Step 3: Start Frontend

```bash
npm run dev
```

Frontend will run on: http://localhost:5173

---

## 🧪 Testing the System

### 1. Test Backend API

**Get Problem Statements:**
```bash
curl http://localhost:3001/api/problem-statements
```

**Register a Team:**
```bash
curl -X POST http://localhost:3001/api/teams/register \
  -H "Content-Type: application/json" \
  -d '{
    "teamName": "Test Team",
    "teamLeaderName": "John Doe",
    "teamLeaderEmail": "john@example.com",
    "institution": "Test University",
    "teamMembers": "Alice, Bob, Charlie",
    "problemStatementId": "paste-uuid-here"
  }'
```

### 2. Test Frontend

1. Open http://localhost:5173
2. Click **Register** button in navbar
3. Fill out the registration form
4. Select a problem statement
5. Click **Register Team**

### 3. Test PS Freezing Logic

Register 3 teams for the same PS:
- 1st team: Registers successfully
- 2nd team: Registers successfully
- 3rd team: Registers successfully + PS freezes
- 4th team: Gets error "Problem statement is full"

---

## 📁 Project Structure

```
AIAgenthon/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # Supabase client
│   │   ├── routes/
│   │   │   ├── teamRoutes.ts        # Team registration endpoints
│   │   │   └── psRoutes.ts          # PS listing endpoint
│   │   ├── services/
│   │   │   └── teamService.ts       # Business logic (PS freeze, validation)
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript types
│   │   ├── utils/
│   │   │   ├── errorHandler.ts      # Error handling
│   │   │   └── logger.ts            # Logging utility
│   │   └── server.ts                # Express app entry
│   ├── database/
│   │   └── setup.sql                # Database schema
│   ├── .env                         # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── pages/
│   │   ├── Index.tsx                # Landing page
│   │   ├── Register.tsx             # NEW: Registration form
│   │   ├── SupplyChain.tsx
│   │   ├── CivicTech.tsx
│   │   ├── DisasterTech.tsx
│   │   └── FinWellness.tsx
│   ├── components/
│   │   ├── Navbar.tsx               # UPDATED: Added Register button
│   │   └── ...
│   └── App.tsx                      # UPDATED: Added /register route
│
├── .env                             # Frontend environment
└── package.json
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3001/api`

#### 1. Get Problem Statements
```
GET /problem-statements
Response: { success: true, data: [...] }
```

#### 2. Register Team
```
POST /teams/register
Body: {
  teamName, teamLeaderName, teamLeaderEmail,
  institution, teamMembers, problemStatementId
}
Response: { success: true, data: { teamId, message } }
```

#### 3. Check Email Availability
```
POST /teams/check-email
Body: { email }
Response: { success: true, data: { available: boolean } }
```

#### 4. Get Team by ID
```
GET /teams/:teamId
Response: { success: true, data: {...} }
```

---

## 🔐 Security Features

- ✅ **Helmet.js** - Security headers
- ✅ **CORS** - Whitelist origins
- ✅ **Rate Limiting** - 100 requests/15min per IP
- ✅ **Input Validation** - Zod schemas
- ✅ **SQL Injection Prevention** - Supabase parameterized queries
- ✅ **Request Size Limits** - 10kb max
- ✅ **Email Uniqueness** - Prevents duplicate registrations

---

## 🎯 Key Features Implemented

### 1. Team Registration
- Unique team ID generation (e.g., `TEAM-1738186234-A8F3D1B2`)
- Email uniqueness validation
- Real-time email availability check
- Form validation with error messages

### 2. Problem Statement Selection
- Dropdown with all 12 PSs
- Real-time availability status
- Team count display (e.g., "2/3 teams")
- Frozen PS shown as disabled

### 3. PS Freezing Logic (Max 3 Teams)
- Automatic freeze when 3rd team registers
- Concurrent registration handling
- Transaction-safe team counting
- Clear error messages when full

### 4. High Traffic Optimization
- Compression middleware
- Rate limiting
- Indexed database queries
- Connection pooling (Supabase)
- Optimized JSON parsing

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Kill process if needed
taskkill /PID <PID> /F

# Restart backend
npm run dev
```

### Database connection errors
1. Verify Supabase URL and key in `backend/.env`
2. Check Supabase project is active
3. Ensure RLS policies are enabled
4. Run `backend/database/setup.sql` again

### CORS errors
1. Ensure backend is running
2. Check `ALLOWED_ORIGINS` in `backend/.env`
3. Verify frontend URL matches allowed origins

### Frontend can't connect to backend
1. Verify `VITE_API_URL` in `.env`
2. Ensure backend is running on port 3001
3. Check browser console for errors

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `@supabase/supabase-js` - Database client
- `zod` - Validation
- `helmet` - Security
- `cors` - Cross-origin requests
- `express-rate-limit` - Rate limiting
- `compression` - Response compression

### Frontend
- Already installed (React, Vite, Tailwind, etc.)
- No new dependencies needed

---

## 🚀 Deployment

### Backend (Production)
1. Set `NODE_ENV=production`
2. Update `ALLOWED_ORIGINS` with production URL
3. Use PM2 or similar process manager
4. Enable HTTPS
5. Set up monitoring (Sentry, New Relic, etc.)

### Frontend (Production)
1. Update `VITE_API_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist/` folder to Vercel, Netlify, etc.

### Database
- Supabase handles scaling automatically
- Monitor query performance in Supabase dashboard
- Set up database backups

---

## 📝 Notes

- **Team ID Format**: `TEAM-<timestamp>-<8-char-uuid>`
- **Max Teams per PS**: 3 (configurable in database)
- **Rate Limit**: 100 requests per 15 minutes
- **Email Validation**: Real-time with debounce (800ms)
- **Database**: Supabase (PostgreSQL with Row Level Security)

---

## 🎉 You're All Set!

Your full-stack registration system is ready to handle high traffic with:
- Secure authentication
- Real-time validation
- Auto-freezing problem statements
- Scalable architecture

For questions or issues, check the logs:
- Backend: Console output from `npm run dev`
- Frontend: Browser console (F12)
- Database: Supabase Logs dashboard
