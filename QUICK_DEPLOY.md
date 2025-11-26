# 🚀 QUICK DEPLOY GUIDE

## Step 1: GitHub (2 minutes)
```bash
cd C:\Users\sarav\Desktop\BossCabs
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## Step 2: Render Backend (5 minutes)
1. render.com → New Web Service
2. Connect GitHub repo
3. Root Directory: **`backend`**
4. Build: `npm install`
5. Start: `npm start`
6. Add Environment Variable:
   ```
   MONGODB_URI = mongodb+srv://bosscars8055_admin:Boss%24Cars%248055@bosscars.6xb9ylu.mongodb.net/bosscars?retryWrites=true&w=majority&appName=BossCars
   ```
7. Deploy → Copy URL

## Step 3: Vercel Frontend (3 minutes)
1. vercel.com → New Project
2. Import GitHub repo
3. Root Directory: **`frontend`**
4. Framework: **Vite** (auto-detected)
5. Add Environment Variable:
   ```
   VITE_API_URL = https://YOUR-BACKEND.onrender.com
   ```
   ⚠️ Use YOUR Render URL from Step 2!
6. Deploy

## ✅ Done! Test It:
- Visit your Vercel URL
- Submit a booking
- Check MongoDB & Sheets

**Total Time: ~10 minutes** 🎉
