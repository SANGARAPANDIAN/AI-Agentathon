# Push to GitHub Repository
# Repository: https://github.com/SANGARAPANDIAN/AI-Agentathon.git

Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "     AI AGENTATHON - Push to GitHub" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "e:\AIAgenthon"

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "⚙️  Initializing Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git initialized" -ForegroundColor Green
    Write-Host ""
}

# Configure remote
Write-Host "🔗 Configuring remote repository..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/SANGARAPANDIAN/AI-Agentathon.git
Write-Host "✅ Remote: SANGARAPANDIAN/AI-Agentathon" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "📝 Adding files..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files staged" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "AI Agentathon: Complete registration system with backend and frontend

Features:
- Express.js + TypeScript backend (Node.js)
- React + Vite frontend with Tailwind CSS
- Supabase PostgreSQL database
- 10 problem statements with auto-freezing (max 3 teams each)
- Team registration with email validation
- Real-time team count updates
- Deployment guides for Vercel & Render
- Complete API with CORS and rate limiting"

Write-Host "✅ Changes committed" -ForegroundColor Green
Write-Host ""

# Set branch to main
Write-Host "🌿 Setting branch to main..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Branch: main" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "   Repository: https://github.com/SANGARAPANDIAN/AI-Agentathon.git" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  AUTHENTICATION REQUIRED" -ForegroundColor Yellow
Write-Host "   When prompted:" -ForegroundColor Gray
Write-Host "   - Username: Your GitHub username" -ForegroundColor Gray
Write-Host "   - Password: Your Personal Access Token (NOT your GitHub password)" -ForegroundColor Gray
Write-Host ""
Write-Host "   Don't have a token? Create one:" -ForegroundColor Gray
Write-Host "   https://github.com/settings/tokens/new" -ForegroundColor Blue
Write-Host "   - Select 'repo' scope" -ForegroundColor Gray
Write-Host "   - Generate and copy the token" -ForegroundColor Gray
Write-Host ""

# Attempt push
$pushSuccess = $false
try {
    git push -u origin main --progress
    $pushSuccess = $true
} catch {
    Write-Host ""
    Write-Host "❌ Push failed. Common issues:" -ForegroundColor Red
    Write-Host "   1. Authentication failed - Use Personal Access Token, not password" -ForegroundColor Yellow
    Write-Host "   2. Repository doesn't exist - Create it on GitHub first" -ForegroundColor Yellow
    Write-Host "   3. Permission denied - Check repository access" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Try GitHub CLI instead:" -ForegroundColor Cyan
    Write-Host "   gh auth login" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
}

if ($pushSuccess) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "           ✅ PUSH SUCCESSFUL!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════════════" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your project is now on GitHub!" -ForegroundColor Cyan
    Write-Host "   View at: https://github.com/SANGARAPANDIAN/AI-Agentathon" -ForegroundColor Blue
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Deploy backend on Render" -ForegroundColor White
    Write-Host "   2. Deploy frontend on Vercel" -ForegroundColor White
    Write-Host "   3. See DEPLOYMENT_GUIDE.md for instructions" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
