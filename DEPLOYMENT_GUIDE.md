# 🚀 BOSSCARS Deployment Guide

Complete step-by-step guide to deploy BOSSCARS application using **Render** (Backend) and **Vercel** (Frontend).

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas cluster (already set up)
- ✅ Google Sheets API credentials (already configured)
- ✅ Your project code ready

---

## 🗂️ STEP 1: Prepare Your Code for Deployment

### 1.1 Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd C:\Users\sarav\Desktop\BOSSCARS
   git init
   ```

2. **Create `.gitignore` file** in the root directory:
   ```
   # Node modules
   node_modules/
   
   # Environment variables
   .env
   backend/.env
   frontend/.env
   
   # Build files
   frontend/dist/
   frontend/build/
   
   # OS files
   .DS_Store
   Thumbs.db
   
   # IDE files
   .vscode/
   .idea/
   ```

3. **Add all files**:
   ```bash
   git add .
   git commit -m "Initial commit - BOSSCARS application"
   ```

4. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name: `bosscars`
   - Description: "Car and Bus Booking System"
   - Keep it **Public** (for free deployment on Render/Vercel)
   - Click "Create repository"

5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/bosscars.git
   git branch -M main
   git push -u origin main
   ```

---

## 🖥️ STEP 2: Deploy Backend on Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with your **GitHub account** (recommended)
4. Authorize Render to access your GitHub repositories

### 2.2 Create New Web Service

1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Find and select `bosscars` repository
   - Click **"Connect"**

### 2.3 Configure Backend Service

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `bosscars-backend` |
| **Region** | Choose closest to you (e.g., Singapore, Mumbai) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 2.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```
PORT=5000
MONGODB_URI=mongodb+srv://bosscars8055_admin:YOUR_ACTUAL_PASSWORD@bosscars.6xb9ylu.mongodb.net/bosscars
JWT_SECRET=bosscars_secret_key_2024_secure
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
GOOGLE_SHEETS_CLIENT_EMAIL=bosscars-sheets@bamboo-parsec-476813-r1.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----
GOOGLE_SHEETS_SPREADSHEET_ID=1FtwOwUTRCqjtkKrsVDjO2PQL4fVaYiYfBAl5-NJaOkA
FRONTEND_URL=https://bosscars.vercel.app
```

⚠️ **Important Notes:**
- For `GOOGLE_SHEETS_PRIVATE_KEY`: Copy the ENTIRE key from your `.env` file including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Replace `\n` with actual line breaks or keep as `\n` (Render handles both)
- The `FRONTEND_URL` will be updated after deploying frontend

### 2.5 Deploy Backend

1. Click **"Create Web Service"**
2. Render will automatically start building and deploying
3. Wait 3-5 minutes for deployment to complete
4. Once deployed, you'll see: ✅ **"Live"** status
5. **Copy your backend URL**: `https://bosscars-backend.onrender.com`

### 2.6 Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Navigate to **Network Access**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** → `0.0.0.0/0`
5. Click **"Confirm"**

⚠️ This allows Render's dynamic IPs to connect. For better security, you can whitelist Render's specific IP ranges later.

---

## 🌐 STEP 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Sign up with your **GitHub account**
4. Authorize Vercel to access your repositories

### 3.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find and select your `bosscars` repository
3. Click **"Import"**

### 3.3 Configure Frontend Project

| Field | Value |
|-------|-------|
| **Project Name** | `bosscars` |
| **Framework Preset** | `Vite` (should auto-detect) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### 3.4 Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL=https://bosscars-backend.onrender.com
```

⚠️ Replace with your actual Render backend URL from Step 2.5

### 3.5 Deploy Frontend

1. Click **"Deploy"**
2. Vercel will build and deploy (takes 2-3 minutes)
3. Once complete, you'll get a URL like: `https://bosscars.vercel.app`
4. Click **"Visit"** to see your live website! 🎉

---

## 🔄 STEP 4: Update Backend CORS

Now that you have your Vercel frontend URL, update the backend:

1. Go back to **Render Dashboard**
2. Click on your `bosscars-backend` service
3. Go to **"Environment"** tab
4. Edit the `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://bosscars.vercel.app
   ```
   (Replace with your actual Vercel URL)
5. Click **"Save Changes"**
6. Render will automatically redeploy

---

## ✅ STEP 5: Test Your Deployment

### 5.1 Test Frontend
1. Open your Vercel URL: `https://bosscars.vercel.app`
2. Check that the homepage loads correctly
3. Navigate through sections: Home → Services → Book → About → Contact

### 5.2 Test Booking System
1. Click **"Book Now"** or scroll to booking section
2. Fill in the booking form:
   - **Full Name**: Your name
   - **Service Type**: Car
   - **Car Type**: Sedan
   - **Pickup**: Mumbai
   - **Drop**: Pune
   - **Date**: Tomorrow's date
   - **Time**: 10:00 AM
   - **Mobile**: 10-digit number
   - **Email**: Your email
3. Click **"Confirm Booking"**
4. You should see: ✅ "Booking successful!"

### 5.3 Test Admin Dashboard
1. Navigate to: `https://bosscars.vercel.app` (click Admin link or add `/admin` to URL)
2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`
3. You should see your bookings in the dashboard

### 5.4 Verify Google Sheets Sync
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1FtwOwUTRCqjtkKrsVDjO2PQL4fVaYiYfBAl5-NJaOkA
2. Check **Sheet1** tab - you should see the booking data with 15 columns
3. In Admin Dashboard, click **"📊 Sync Bookings"** to manually sync

### 5.5 Test Reviews System
1. On the homepage, scroll to reviews section
2. Click **"Submit a Review"**
3. Enter your booking ID and submit a review
4. Login to admin panel and verify the review

---

## 🔧 STEP 6: Custom Domain (Optional)

### For Vercel Frontend:
1. Go to Vercel Dashboard → Your Project → **"Settings"** → **"Domains"**
2. Add your custom domain (e.g., `bosscars.com`)
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` in Render backend environment variables

### For Render Backend:
1. Go to Render Dashboard → Your Service → **"Settings"** → **"Custom Domains"**
2. Add custom domain (e.g., `api.bosscars.com`)
3. Follow DNS configuration
4. Update `VITE_API_URL` in Vercel environment variables

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: Backend not connecting to MongoDB
- **Solution**: Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify `MONGODB_URI` in Render environment variables

**Problem**: Google Sheets not syncing
- **Solution**: Check `GOOGLE_SHEETS_PRIVATE_KEY` is correctly formatted
- Ensure service account has "Editor" access to the spreadsheet

**Problem**: CORS errors
- **Solution**: Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check backend logs in Render dashboard

### Frontend Issues

**Problem**: API calls failing
- **Solution**: Verify `VITE_API_URL` in Vercel points to correct Render URL
- Check if backend is "Live" on Render
- Look at Network tab in browser DevTools

**Problem**: Build fails on Vercel
- **Solution**: Check build logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### General Issues

**Problem**: Render backend goes to sleep (Free tier)
- **Solution**: Backend sleeps after 15 min of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- Consider upgrading to paid tier for 24/7 uptime

**Problem**: Environment variables not updating
- **Solution**: After changing env vars, manually trigger redeploy:
  - Render: Go to service → "Manual Deploy" → "Deploy latest commit"
  - Vercel: Go to project → "Deployments" → Click "..." → "Redeploy"

---

## 📊 Monitoring Your Application

### Render Dashboard
- View real-time logs
- Monitor CPU and memory usage
- Check deployment history
- View error logs

### Vercel Dashboard
- See deployment status
- View build logs
- Check analytics (visits, page views)
- Monitor performance

---

## 🔒 Security Best Practices

1. **Change default admin password** after first login
2. **Use strong JWT secret** (generate random 64-character string)
3. **Keep `.env` files secure** - never commit to GitHub
4. **Enable MongoDB Atlas IP whitelist** with specific IPs (after testing)
5. **Use HTTPS only** (Render and Vercel provide this automatically)
6. **Regular backups** of MongoDB Atlas database

---

## 🚀 Future Enhancements

- [ ] Set up custom domain
- [ ] Add email notifications (SendGrid, Mailgun)
- [ ] Integrate real SMS service (Twilio, MSG91)
- [ ] Add payment gateway (Razorpay, Stripe)
- [ ] Set up monitoring (Sentry for error tracking)
- [ ] Add analytics (Google Analytics)
- [ ] Implement rate limiting
- [ ] Add database backups automation

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Service → "Logs" tab
2. Check Vercel logs: Dashboard → Project → "Deployments" → Click deployment
3. Check browser console for frontend errors (F12)
4. Verify all environment variables are set correctly

---

## 🎉 Congratulations!

Your BOSSCARS application is now live! 🚗✨

- **Frontend**: https://bosscars.vercel.app
- **Backend**: https://bosscars-backend.onrender.com
- **Admin Panel**: https://bosscars.vercel.app/admin

Share your website with customers and start receiving bookings! 🎊
