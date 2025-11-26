# 📋 Pre-Deployment Checklist

## ✅ Code Preparation

- [x] All image paths use `/images/...` format (absolute paths from public directory)
- [x] API URL uses environment variable (`VITE_API_URL`)
- [x] CORS configured for production domains
- [x] `.gitignore` updated to exclude sensitive files
- [x] Environment example files created (`.env.example`)
- [x] Vite config optimized for production build

## 🖼️ Image Verification

### Current Images:
- [x] `/images/logo.png` - Logo
- [x] `/images/background.jpeg` - Hero background
- [x] `/images/cars/cars1.jpeg` - Swift Dzire
- [x] `/images/cars/cars2.jpeg` - Innova
- [x] `/images/cars/cars3.jpeg` - Honda City
- [x] `/images/cars/cars4.jpeg` - Sedan
- [x] `/images/cars/Travels_bus1.jpeg` - Luxury Bus
- [x] `/images/cars/Travels_bus2.jpeg` - Executive Bus

### Image Path Format:
✅ **Correct**: `/images/cars/cars1.jpeg`
❌ **Wrong**: `./images/cars/cars1.jpeg` or `../images/cars1.jpeg`

All images are correctly configured!

## 🔒 Security Check

- [ ] MongoDB credentials not in Git (in .env only)
- [ ] `.env` file is in `.gitignore`
- [ ] Google Sheets script URL is public (set to "Anyone")
- [ ] CORS configured properly for your domains

## 📦 Dependencies Check

### Backend Dependencies:
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "axios": "^1.6.0",
  "docx": "^8.5.0",
  "bcryptjs": "^2.4.3"
}
```

### Frontend Dependencies:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.4",
  "axios": "^1.6.0"
}
```

## 🚀 GitHub Upload Steps

1. **Initialize Git** (if not already done):
```bash
cd C:\Users\sarav\Desktop\BossCabs
git init
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Name: `bosscars` or `boss-cars-booking`
   - Visibility: Public or Private
   - Don't initialize with README (you already have one)

3. **Add and Commit**:
```bash
git add .
git commit -m "Initial commit: Boss Cars booking system

- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB
- Features: Car booking with dual storage (MongoDB + Sheets)
- All images configured for deployment
"
```

4. **Connect to GitHub**:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## 🌐 Render Deployment (Backend)

1. **Create New Web Service**:
   - Connect GitHub repository
   - Name: `bosscars-backend`
   - Root Directory: `backend`
   - Environment: Node
   - Branch: `main`

2. **Build Settings**:
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables** (Add these in Render dashboard):
```
MONGODB_URI=mongodb+srv://bosscars8055_admin:Boss%24Cars%248055@bosscars.6xb9ylu.mongodb.net/bosscars?retryWrites=true&w=majority&appName=BossCars
PORT=5000
NODE_ENV=production
```

4. **After Deployment**:
   - Copy your Render URL (e.g., `https://bosscars-backend.onrender.com`)
   - Test with: `https://your-backend-url.onrender.com/` (should return JSON)

## ☁️ Vercel Deployment (Frontend)

1. **Import Project**:
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository

2. **Configure Project**:
   - Framework Preset: **Vite**
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

3. **Environment Variables** (Add in Vercel):
```
VITE_API_URL=https://your-backend-url.onrender.com
```
⚠️ **Important**: Replace with YOUR actual Render backend URL!

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

## 🧪 Post-Deployment Testing

### Test Checklist:
1. [ ] Homepage loads correctly
2. [ ] All images display properly
3. [ ] Navigation works
4. [ ] Booking form appears
5. [ ] Form validation works
6. [ ] Submit a test booking
7. [ ] Check MongoDB Atlas - booking saved?
8. [ ] Check Google Sheets - booking saved?
9. [ ] Mobile responsive - test on phone
10. [ ] Browser console - no errors?

### Test Booking Data:
- Name: Test User
- Mobile: 9876543210
- Email: test@example.com
- Pickup: Test Location A
- Dropoff: Test Location B
- Vehicle: Any
- Date: Tomorrow
- Time: 10:00 AM

## 🐛 Common Issues & Solutions

### Images Not Loading on Vercel:
✅ **Solution**: All images already use correct paths (`/images/...`)
- Vite automatically copies `public/` folder contents to root
- No changes needed!

### CORS Error:
✅ **Solution**: Already configured in backend `server.js`
- Update the Vercel domain in CORS if you use custom domain

### Backend Connection Failed:
- Check Render logs
- Verify environment variables in Render
- Test backend URL directly in browser

### Google Sheets Not Saving:
- Verify Apps Script deployment is "Anyone"
- Check browser console for errors
- Test the script URL directly

## 📱 Update Domain in CORS (After Deployment)

Once you have your Vercel domain, update backend CORS if needed:

```javascript
// backend/server.js
app.use(cors({
  origin: [
    'https://your-actual-domain.vercel.app',
    'https://custom-domain.com'
  ]
}));
```

## ✨ You're Ready!

All paths are correct, code is deployment-ready. Just follow the steps above to:
1. Push to GitHub ✅
2. Deploy backend to Render ✅
3. Deploy frontend to Vercel ✅
4. Test everything ✅

**Your Boss Cars website will be live in ~10 minutes! 🚗🎉**
