# Boss Cars Deployment Guide

Complete guide to deploy Boss Cars application to production.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [x] GitHub account
- [x] Vercel account (for frontend)
- [x] Render account (for backend)
- [x] MongoDB Atlas account (for database)
- [x] Git installed on your machine
- [x] Node.js v18+ installed

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0 Sandbox)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password (save these!)
   - Grant "Read and write to any database" permission
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `bosscars`
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bosscars?retryWrites=true&w=majority`

---

## 🚀 Step 2: Deploy Backend to Render

### A. Prepare Your Code

1. **Push Code to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### B. Deploy on Render

1. **Create Render Account**
   - Go to [https://render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your Boss Cars repository

3. **Configure Web Service**
   - **Name**: `boss-cars-backend`
   - **Region**: Select closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bosscars?retryWrites=true&w=majority
   PORT=5000
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password_here
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (takes 2-5 minutes)
   - Copy your backend URL (e.g., `https://boss-cars-backend.onrender.com`)

6. **Test Backend**
   - Visit `https://boss-cars-backend.onrender.com`
   - You should see: `{"message":"Boss Cars API is running!","status":"active"}`

---

## 🌐 Step 3: Deploy Frontend to Vercel

### A. Prepare Your Code

1. **Create .env file for production**
   ```bash
   cd frontend
   ```
   
   Create `.env.production` file:
   ```
   VITE_API_URL=https://boss-cars-backend.onrender.com
   ```

2. **Push to GitHub** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

### B. Deploy on Vercel

1. **Create Vercel Account**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://boss-cars-backend.onrender.com
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (takes 1-2 minutes)
   - Your site will be live at `https://your-project.vercel.app`

6. **Test Your Site**
   - Visit your Vercel URL
   - Test all sections: Home, Book Now, Services, About, Contact
   - Test booking form submission
   - Test admin login at `/admin`

---

## ✅ Step 4: Verify Everything Works

### Test Checklist:

- [ ] Frontend loads correctly
- [ ] All sections scroll smoothly
- [ ] Animations work (fade-in, slide-in, scroll animations)
- [ ] Booking form validation works
- [ ] Booking form submits successfully
- [ ] Success message appears after booking
- [ ] Admin login works with your credentials
- [ ] Admin dashboard shows bookings
- [ ] Responsive design works on mobile
- [ ] No console errors

### Test Booking Flow:

1. Fill out booking form
2. Submit booking
3. Check for success message
4. Log into admin panel
5. Verify booking appears in dashboard
6. Check MongoDB Atlas - booking should be in database

---

## 🔧 Step 5: Custom Domain (Optional)

### For Vercel (Frontend):

1. Go to your project settings on Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### For Render (Backend):

1. Go to your service settings on Render
2. Click "Custom Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `VITE_API_URL` in Vercel environment variables

---

## 🔄 Step 6: Update Application After Changes

### Update Backend:

```bash
cd backend
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

Render will automatically redeploy.

### Update Frontend:

```bash
cd frontend
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically redeploy.

---

## 🐛 Troubleshooting

### Backend Issues:

**Problem**: Backend not connecting to MongoDB
- **Solution**: Check MongoDB connection string in Render environment variables
- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas

**Problem**: CORS errors
- **Solution**: Verify CORS is enabled in `server.js`
- Check that frontend is using correct backend URL

### Frontend Issues:

**Problem**: API calls failing
- **Solution**: Verify `VITE_API_URL` environment variable in Vercel
- Test backend URL directly in browser

**Problem**: Environment variables not working
- **Solution**: Environment variables must start with `VITE_`
- Redeploy after adding environment variables

### Database Issues:

**Problem**: Bookings not saving
- **Solution**: Check MongoDB Atlas connection
- Verify database user has write permissions
- Check Render logs for errors

---

## 📊 Monitoring

### Render Dashboard:
- View logs: Render Dashboard → Your Service → Logs
- Check metrics: CPU, Memory usage
- Monitor deployments

### Vercel Dashboard:
- View deployment logs
- Check analytics
- Monitor performance

### MongoDB Atlas:
- Monitor database connections
- View collections data
- Check performance metrics

---

## 🔐 Security Recommendations

1. **Change Default Admin Password**
   - Update `ADMIN_PASSWORD` in Render environment variables
   - Use a strong, unique password

2. **Environment Variables**
   - Never commit `.env` files to Git
   - Keep `.env.example` for reference only

3. **MongoDB**
   - Use strong database passwords
   - Regularly backup your database
   - Consider restricting IP access in production

4. **API Security** (For Future Enhancement)
   - Implement JWT authentication for admin
   - Add rate limiting
   - Use HTTPS only (both Vercel and Render provide this)

---

## 📝 Important URLs to Save

After deployment, save these URLs:

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://boss-cars-backend.onrender.com`
- **Admin Panel**: `https://your-project.vercel.app/admin`
- **MongoDB Atlas**: `https://cloud.mongodb.com`
- **GitHub Repo**: `https://github.com/yourusername/boss-cars`

---

## 🎉 Deployment Complete!

Your Boss Cars application is now live and ready to accept bookings!

**Next Steps:**
1. Share your website URL
2. Test thoroughly on different devices
3. Monitor bookings in admin panel
4. Collect feedback and iterate

---

## 💡 Tips for Free Tier

### Render Free Tier:
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free

### Vercel Free Tier:
- 100 GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS

### MongoDB Atlas Free Tier:
- 512 MB storage
- Enough for thousands of bookings
- No credit card required

---

## 📞 Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables
4. Test MongoDB connection
5. Ensure all services are running

---

**Made with ❤️ for Boss Cars**
