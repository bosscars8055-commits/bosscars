# 📝 Pre-Deployment Code Updates

## Files Created for Deployment

✅ **Configuration Files:**
- `frontend/src/config/api.js` - Centralized API URL configuration
- `frontend/vercel.json` - Vercel deployment configuration
- `backend/render.yaml` - Render deployment configuration
- `frontend/.env.example` - Frontend environment variables template
- `.gitignore` - Git ignore patterns

✅ **Documentation:**
- `DEPLOYMENT_GUIDE.md` - Complete step-by-step deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Quick 30-minute deployment checklist

## Backend Changes Made

✅ **server.js**
- Updated CORS configuration to use `FRONTEND_URL` environment variable
- Now supports production frontend URL from Vercel

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

✅ **bookingRoutes.js**
- Fixed to capture `name` and `carType` fields from request body
- Ensures Google Sheets sync includes all required fields

## Frontend Updates Needed (Optional but Recommended)

The API calls currently use hardcoded `http://localhost:5000`. For better production deployment, you can update them to use the config file:

### Option 1: Quick Fix (Already Working)
Keep the current setup and just set `VITE_API_URL` in Vercel. The hardcoded URLs will work for local development, and you can do a find-replace before production deployment.

### Option 2: Update to Use Config (Recommended)
Update all fetch calls to use the centralized API config:

**Files to update:**
1. `frontend/src/components/BookingForm.jsx`
2. `frontend/src/components/ReviewForm.jsx`
3. `frontend/src/components/Reviews.jsx`
4. `frontend/src/pages/AdminDashboard.jsx`
5. `frontend/src/pages/AdminLogin.jsx`

**Example change:**
```javascript
// Before:
import React from 'react';

// After:
import React from 'react';
import API_BASE_URL from '../config/api';

// Before:
const response = await fetch('http://localhost:5000/api/bookings', {

// After:
const response = await fetch(`${API_BASE_URL}/api/bookings`, {
```

## Environment Variables Summary

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account_email
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000
```

### Production URLs (After Deployment)
```bash
# Backend on Render
FRONTEND_URL=https://bosscars.vercel.app

# Frontend on Vercel
VITE_API_URL=https://bosscars-backend.onrender.com
```

## Deployment Order

1. ✅ **First**: Deploy Backend on Render
   - Get backend URL: `https://bosscars-backend.onrender.com`

2. ✅ **Second**: Deploy Frontend on Vercel
   - Use backend URL in `VITE_API_URL`
   - Get frontend URL: `https://bosscars.vercel.app`

3. ✅ **Third**: Update Backend CORS
   - Update `FRONTEND_URL` in Render with Vercel URL
   - Render will auto-redeploy

## Important Notes

⚠️ **Before Pushing to GitHub:**
- Ensure `.env` files are in `.gitignore`
- Never commit sensitive credentials
- Use `.env.example` files as templates

⚠️ **MongoDB Atlas:**
- Add `0.0.0.0/0` to IP whitelist for Render access
- Or add specific Render IP ranges

⚠️ **Google Sheets:**
- Verify service account has "Editor" access
- Private key must be properly formatted in Render env vars

⚠️ **Free Tier Limitations:**
- Render: Backend sleeps after 15 min inactivity (cold start ~30-60s)
- Vercel: 100 GB bandwidth/month, no sleep
- MongoDB Atlas: 512 MB storage limit

## Testing Checklist

After deployment, test:
- [ ] Homepage loads
- [ ] Create new booking
- [ ] Booking appears in admin dashboard
- [ ] Confirm booking
- [ ] Sync to Google Sheets
- [ ] Submit review
- [ ] Verify review in admin panel
- [ ] All animations work
- [ ] Mobile responsiveness

## Rollback Plan

If deployment fails:
1. Check deployment logs (Render/Vercel dashboards)
2. Verify all environment variables are set
3. Can redeploy previous version from GitHub
4. Local development still works independently

## Next Steps After Deployment

1. Change default admin password
2. Test all features thoroughly
3. Set up custom domain (optional)
4. Add monitoring/analytics
5. Set up email/SMS notifications
6. Consider paid tier for no-sleep backend
7. Regular database backups

---

**Ready to deploy?** 🚀

Follow: `DEPLOYMENT_GUIDE.md` for detailed steps
Or use: `DEPLOYMENT_CHECKLIST.md` for quick 30-min deployment
