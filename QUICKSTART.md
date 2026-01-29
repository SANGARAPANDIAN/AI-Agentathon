# Quick Start Commands

## 1. Database Setup
Go to Supabase SQL Editor and run: `backend/database/setup.sql`

## 2. Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs at: http://localhost:3001

## 3. Start Frontend (Terminal 2)
```bash
npm run dev
```
App runs at: http://localhost:5173

## 4. Test Registration
1. Open http://localhost:5173
2. Click "Register" button
3. Fill form and submit
4. Check Supabase table to see registered team

## API Test
```bash
# Get problem statements
curl http://localhost:3001/api/problem-statements

# Health check
curl http://localhost:3001/health
```

## Troubleshooting
- Backend not starting? Check if port 3001 is free
- CORS errors? Verify backend is running first
- Database errors? Run setup.sql in Supabase
