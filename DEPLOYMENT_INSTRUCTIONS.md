# Boss Cars Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas database (already set up)

## Step 1: Prepare for GitHub

1. **Update environment files**:
   - Backend: Copy `backend/.env.example` to `backend/.env` and add your MongoDB credentials
   - Frontend: Copy `frontend/.env.example` to `frontend/.env`

2. **Ensure `.gitignore` is correct** (already done)

## Step 2: Push to GitHub

```bash
cd C:\Users\sarav\Desktop\BossCabs
git init
git add .
git commit -m "Initial commit - Boss Cars booking system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bosscars.git
git push -u origin main
```

## Step 3: Deploy Backend to Render

1. Go to [https://render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `bosscars-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://bosscars8055_admin:Boss%24Cars%248055@bosscars.6xb9ylu.mongodb.net/bosscars?retryWrites=true&w=majority&appName=BossCars
   PORT=5000
   NODE_ENV=production
   ```

6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://bosscars-backend.onrender.com`)

## Step 4: Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   ```
   VITE_API_URL=https://bosscars-backend.onrender.com
   ```
   (Use the Render backend URL from Step 3)

6. Click **Deploy**
7. Wait for deployment to complete
8. Your site will be live at `https://bosscars.vercel.app` (or similar)

## Step 5: Update CORS in Backend

After deployment, update `backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://bosscars.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

Then push changes and Render will auto-deploy.

## Step 6: Test Your Deployed Site

1. Visit your Vercel URL
2. Submit a test booking
3. Verify data appears in:
   - MongoDB Atlas
   - Google Sheets

## Troubleshooting

### Images not loading:
- Ensure all images are in `frontend/public/images/`
- Image paths use `/images/...` not `./images/...`
- Clear Vercel cache and redeploy

### Backend connection fails:
- Check Render logs
- Verify MONGODB_URI in Render environment variables
- Check CORS configuration

### Google Sheets not working:
- Verify Apps Script deployment is set to "Anyone"
- Check browser console for errors

## Environment Variables Summary

### Backend (Render):
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `PORT`: 5000
- `NODE_ENV`: production

### Frontend (Vercel):
- `VITE_API_URL`: Your Render backend URL

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Render:
1. Go to Service → Settings → Custom Domain
2. Add your backend domain
3. Update frontend `VITE_API_URL` to use custom domain

---

## Quick Commands Reference

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Check git status
git status
```

**Note**: The `.env` files are not committed to GitHub (they're in `.gitignore`). You must set environment variables directly in Render and Vercel dashboards.
