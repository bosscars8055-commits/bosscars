# 🚀 Quick Deployment Checklist

Use this checklist to deploy BOSSCARS in 30 minutes!

## ☑️ Pre-Deployment (5 minutes)

- [ ] Code is working locally (both frontend and backend running)
- [ ] MongoDB Atlas cluster is set up and accessible
- [ ] Google Sheets API is configured
- [ ] You have a GitHub account
- [ ] All sensitive data is in `.env` files (not in code)

## ☑️ GitHub Setup (5 minutes)

- [ ] Create `.gitignore` file (includes node_modules, .env)
- [ ] Initialize git: `git init`
- [ ] Commit code: `git add . && git commit -m "Initial commit"`
- [ ] Create new GitHub repository: `bosscars`
- [ ] Push code: `git remote add origin <URL> && git push -u origin main`

## ☑️ Backend on Render (10 minutes)

- [ ] Sign up at https://render.com with GitHub
- [ ] Create New Web Service
- [ ] Connect `bosscars` repository
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add all 8 environment variables:
  - [ ] PORT=5000
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] DEFAULT_ADMIN_USERNAME=admin
  - [ ] DEFAULT_ADMIN_PASSWORD
  - [ ] GOOGLE_SHEETS_CLIENT_EMAIL
  - [ ] GOOGLE_SHEETS_PRIVATE_KEY
  - [ ] GOOGLE_SHEETS_SPREADSHEET_ID
  - [ ] FRONTEND_URL (add temporarily, update later)
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 min)
- [ ] Copy backend URL: `https://bosscars-backend.onrender.com`
- [ ] MongoDB Atlas: Add IP whitelist `0.0.0.0/0`

## ☑️ Frontend on Vercel (5 minutes)

- [ ] Sign up at https://vercel.com with GitHub
- [ ] Import `bosscars` repository
- [ ] Set Root Directory: `frontend`
- [ ] Framework: Vite (auto-detected)
- [ ] Add environment variable:
  - [ ] VITE_API_URL=<your-render-backend-url>
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 min)
- [ ] Copy frontend URL: `https://bosscars.vercel.app`

## ☑️ Final Configuration (5 minutes)

- [ ] Go to Render → Backend Service → Environment
- [ ] Update FRONTEND_URL with Vercel URL
- [ ] Save (Render auto-redeploys)
- [ ] Test your live website!
- [ ] Create a test booking
- [ ] Login to admin panel (admin/admin123)
- [ ] Verify Google Sheets sync
- [ ] Test review submission

## ☑️ Post-Deployment

- [ ] Change default admin password
- [ ] Share your website URL
- [ ] Bookmark both dashboard URLs
- [ ] Save environment variables securely
- [ ] Set up monitoring/analytics (optional)

---

## 📝 Important URLs

Save these after deployment:

- **Live Website**: ___________________________
- **Backend API**: ___________________________
- **Admin Panel**: ___________________________
- **GitHub Repo**: ___________________________
- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Google Sheet**: https://docs.google.com/spreadsheets/d/1FtwOwUTRCqjtkKrsVDjO2PQL4fVaYiYfBAl5-NJaOkA

---

## 🆘 Quick Fixes

**Backend won't start?**
→ Check Render logs → Verify MongoDB connection → Check env variables

**Frontend shows API errors?**
→ Verify VITE_API_URL in Vercel → Check backend is "Live" on Render

**CORS errors?**
→ Update FRONTEND_URL in Render to match Vercel URL exactly

**Sheets not syncing?**
→ Verify GOOGLE_SHEETS_PRIVATE_KEY format → Check service account permissions

---

✅ **Total Time**: ~30 minutes
🎉 **Result**: Fully deployed booking system!
