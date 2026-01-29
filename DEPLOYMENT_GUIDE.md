# 🚀 Deploying AIAgenthon to Vercel & Render

## 📋 Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)
- Your code pushed to a GitHub repository

---

## PART 1: Deploy Backend to Render ⚙️

### Step 1: Prepare Backend for Deployment

1. **Push your code to GitHub** (if not already done)
   - Make sure `backend/` folder is in your repository

### Step 2: Create Render Account & Deploy

1. **Go to https://render.com**
   - Click "Get Started" or "Sign Up"
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" button (top right)
   - Select "Web Service"

3. **Connect GitHub Repository**
   - Click "Connect account" to authorize GitHub
   - Search for your repository: `AIAgenthon`
   - Click "Connect"

4. **Configure Service**
   Fill in the following:

   **Basic Info:**
   - Name: `aiagenthon-backend` (or your preferred name)
   - Region: Choose closest to you (e.g., Singapore, Oregon)
   - Branch: `main` (or your default branch)
   - Root Directory: `backend`

   **Build & Deploy:**
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Instance Type:**
   - Select `Free` (or paid plan for better performance)

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these variables:
   ```
   PORT = 3001
   NODE_ENV = production
   SUPABASE_URL = https://cigenkhmolwdlxrsibov.supabase.co
   SUPABASE_ANON_KEY = sb_publishable_4sKcz7ickLeFFryDTXpvEQ_SNLzcZwo
   ALLOWED_ORIGINS = https://ai-agentathon.vercel.app
   RATE_LIMIT_WINDOW_MS = 900000
   RATE_LIMIT_MAX_REQUESTS = 100
   ```
   
   ⚠️ **IMPORTANT**: Update `ALLOWED_ORIGINS` after deploying frontend!

6. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your backend URL will be: `https://aiagenthon-backend.onrender.com`

7. **Test Backend**
   - Click on the URL or visit: `https://aiagenthon-backend.onrender.com/health`
   - You should see: `{"success":true,"message":"Server is running"...}`

---

## PART 2: Deploy Frontend to Vercel 🌐

### Step 1: Create Vercel Account

1. **Go to https://vercel.com**
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel

### Step 2: Import Project

1. **Click "Add New..." → "Project"**

2. **Import Git Repository**
   - Find your `AIAgenthon` repository
   - Click "Import"

3. **Configure Project**

   **Project Settings:**
   - Project Name: `aiagenthon` (or your preferred name)
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave as root, NOT backend)

   **Build Settings:**
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
   - Install Command: `npm install` (default)

4. **Add Environment Variables**
   Under "Environment Variables" section:
   
   ```
   VITE_API_URL = https://aiagenthon-backend.onrender.com
   ```
   
   ⚠️ Replace with YOUR actual Render backend URL (from Part 1, Step 6)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your frontend URL will be: `https://ai-agentathon.vercel.app`

---

## PART 3: Connect Frontend & Backend 🔗

### Step 1: Update Backend CORS

1. **Go back to Render Dashboard**
2. **Select your backend service**
3. **Go to "Environment" tab**
4. **Edit `ALLOWED_ORIGINS` variable**
   - Add your Vercel URL: `https://ai-agentathon.vercel.app`
   - You can add multiple, separated by commas:
     ```
     https://ai-agentathon.vercel.app,http://localhost:8081,http://localhost:3000
     ```
5. **Save Changes**
6. **Render will auto-redeploy** (wait 2-3 minutes)

### Step 2: Verify Deployment

1. **Visit your Vercel app**: `https://ai-agentathon.vercel.app`
2. **Navigate to Register page**: `/register`
3. **Check dropdown** - should show all 10 problem statements
4. **Test registration** - should work end-to-end!

---

## 📝 Important Notes

### Backend (Render)
- ✅ Free tier available (spins down after 15 min inactivity)
- ⚠️ First request after sleep takes ~30-60 seconds
- 💡 Use paid plan ($7/month) for always-on service

### Frontend (Vercel)
- ✅ Free tier: Unlimited bandwidth for personal projects
- ✅ Automatic HTTPS
- ✅ Auto-deploys on git push
- ✅ Fast global CDN

### Environment Variables
- Backend needs: SUPABASE_URL, SUPABASE_ANON_KEY, ALLOWED_ORIGINS
- Frontend needs: VITE_API_URL (pointing to Render backend)

---

## 🔧 Troubleshooting

### "CORS Error" in Frontend
- Check `ALLOWED_ORIGINS` in Render includes your Vercel URL
- Make sure there's no trailing slash in URLs

### "Network Error" in Registration Form
- Verify `VITE_API_URL` in Vercel points to correct Render URL
- Test backend health: `https://ai-agentathon-1.onrender.com/health`

### Backend Not Responding
- Render free tier sleeps after inactivity
- First request takes time to wake up
- Check Render logs for errors

### Registration Not Working
- Verify Supabase RLS policies are set (from fix-rls-policies.sql)
- Check Render logs for errors
- Test API directly: `https://ai-agentathon-1.onrender.com/api/problem-statements`

---

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Backend health check works
- [ ] Frontend deployed on Vercel
- [ ] Frontend loads correctly
- [ ] Problem statements appear in dropdown
- [ ] Registration form works
- [ ] Team counts update after registration
- [ ] Email validation works
- [ ] PS freezing works (3 teams max)

---

## 📞 Quick Links

- Render Dashboard: https://dashboard.render.com
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard

---

**🎊 Your AIAgenthon registration system is now live!**
