# AI Agentathon Registration System 🚀

Complete team registration system for AI hackathon events with real-time team counting and problem statement freezing.

## 🌐 Live Deployment

- **Frontend:** https://ai-agentathon.vercel.app
- **Backend API:** https://ai-agentathon-1.onrender.com
- **Registration Page:** https://ai-agentathon.vercel.app/register

## 🏗️ Tech Stack

### Frontend
- React 18.3.1 + TypeScript
- Vite 5.4.19
- Tailwind CSS
- Shadcn/ui components

### Backend
- Node.js + Express.js + TypeScript
- Supabase PostgreSQL
- CORS, Helmet, Rate Limiting
- Zod validation

## ✨ Features

- ✅ Team registration with validation
- ✅ Email uniqueness checking
- ✅ 10 problem statements with auto-freezing (max 3 teams each)
- ✅ Real-time team count updates
- ✅ Responsive UI with glass-morphism design
- ✅ Deployed on Vercel (frontend) + Render (backend)

## 📖 Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Complete step-by-step deployment instructions
- [API Documentation](backend/README.md) - Backend API endpoints

## 🚀 Quick Start

### Local Development

**Frontend:**
```bash
npm install
npm run dev
# Visit http://localhost:5173
```

**Backend:**
```bash
cd backend
npm install
npm run dev
# API runs on http://localhost:3001
```

## 🔐 Environment Variables

**Frontend (.env):**
```
VITE_API_URL=https://ai-agentathon-1.onrender.com
```

**Backend (backend/.env):**
```
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://cigenkhmolwdlxrsibov.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
ALLOWED_ORIGINS=https://ai-agentathon.vercel.app,http://localhost:5173
```

## 📊 Database

Using Supabase PostgreSQL with:
- `problem_statements` table - 10 PSs with team counting
- `teams` table - Team registrations with PS foreign key
- Row Level Security (RLS) enabled
- Automatic count updates and freezing logic

## 🎯 API Endpoints

- `GET /health` - Health check
- `GET /api/problem-statements` - Get all problem statements
- `POST /api/teams/register` - Register new team
- `POST /api/teams/check-email` - Check email uniqueness
- `GET /api/teams/:id` - Get team by ID

## 📝 License

MIT

---

**Built for AI Agentathon 2026** 🤖