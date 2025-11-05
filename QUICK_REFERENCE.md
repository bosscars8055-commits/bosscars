# 🚀 DEPLOYMENT QUICK REFERENCE CARD

Save this for quick access during deployment!

---

## 📝 Important URLs to Bookmark

| Service | URL | Purpose |
|---------|-----|---------|
| **Render** | https://dashboard.render.com | Backend hosting dashboard |
| **Vercel** | https://vercel.com/dashboard | Frontend hosting dashboard |
| **MongoDB** | https://cloud.mongodb.com | Database management |
| **GitHub** | https://github.com | Code repository |
| **Google Sheet** | [Your Sheet URL] | Data spreadsheet |

---

## 🔑 Environment Variables Reference

### Backend (Render) - 8 Variables

```bash
PORT=5000
MONGODB_URI=mongodb+srv://bosscars8055_admin:YOUR_NEW_PASSWORD_HERE@bosscars.6xb9ylu.mongodb.net/bosscars
JWT_SECRET=bosscars_secret_key_2024_secure
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
GOOGLE_SHEETS_CLIENT_EMAIL=[From your .env]
GOOGLE_SHEETS_PRIVATE_KEY=[From your .env - entire key with BEGIN/END]
GOOGLE_SHEETS_SPREADSHEET_ID=1FtwOwUTRCqjtkKrsVDjO2PQL4fVaYiYfBAl5-NJaOkA
```

**Update after Vercel deployment:**
```bash
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel) - 1 Variable

```bash
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🎯 Deployment Sequence

```
1. GitHub    →  2. Render    →  3. Vercel    →  4. Update Render
   (5 min)       (10 min)        (5 min)         (2 min)
```

---

## 🔧 Render Configuration

| Setting | Value |
|---------|-------|
| Name | `bosscars-backend` |
| Root Directory | `backend` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free |

---

## 🌐 Vercel Configuration

| Setting | Value |
|---------|-------|
| Project Name | `bosscars` |
| Framework | Vite |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## ✅ Post-Deployment Checklist

- [ ] Backend shows "Live" status on Render
- [ ] Frontend loads at Vercel URL
- [ ] Test create booking
- [ ] Login to admin (admin/admin123)
- [ ] View booking in admin dashboard
- [ ] Click "Sync Bookings" button
- [ ] Verify data in Google Sheets
- [ ] Submit a review
- [ ] Verify review appears

---

## 🐛 Quick Troubleshooting

### Backend Won't Start
```
1. Check Render logs
2. Verify MONGODB_URI is correct
3. Ensure MongoDB Atlas IP whitelist: 0.0.0.0/0
4. Check all env vars are set
```

### Frontend Can't Connect to Backend
```
1. Verify VITE_API_URL in Vercel
2. Check backend is "Live" on Render
3. Update FRONTEND_URL in Render
4. Check browser console (F12)
```

### Google Sheets Not Syncing
```
1. Verify GOOGLE_SHEETS_PRIVATE_KEY format
2. Check service account has Editor access
3. Confirm SPREADSHEET_ID is correct
4. Check Render logs for errors
```

### CORS Errors
```
1. FRONTEND_URL in Render must match Vercel URL exactly
2. Include https:// prefix
3. No trailing slash
4. Redeploy backend after changing
```

---

## 📱 Test User Journey

1. Visit: `https://your-app.vercel.app`
2. Scroll to "Book Your Ride" section
3. Fill form:
   - Name: Test User
   - Service: Car
   - Car Type: Sedan
   - Pickup: Mumbai
   - Drop: Pune
   - Date: Tomorrow
   - Time: 10:00 AM
   - Mobile: 9876543210
4. Submit → Should see success message
5. Go to: `https://your-app.vercel.app/admin`
6. Login: admin / admin123
7. See booking in dashboard
8. Click "Confirm & Send SMS"
9. Click "📊 Sync Bookings"
10. Check Google Sheets

---

## 🔐 Security Reminders

- [ ] Change admin password after deployment
- [ ] Never commit `.env` files
- [ ] Keep backup of environment variables
- [ ] Use strong JWT_SECRET in production
- [ ] Enable MongoDB Atlas IP restrictions (after testing)
- [ ] Regular database backups

---

## 📊 Free Tier Limits

| Service | Limit | Notes |
|---------|-------|-------|
| **Render** | Backend sleeps after 15 min | 30-60s cold start |
| **Vercel** | 100 GB bandwidth/month | More than enough |
| **MongoDB** | 512 MB storage | ~10,000 bookings |

---

## 🎓 Documentation Files

| File | When to Use |
|------|-------------|
| `DEPLOYMENT_READY.md` | Overview & preparation |
| `DEPLOYMENT_GUIDE.md` | Detailed step-by-step |
| `DEPLOYMENT_CHECKLIST.md` | Quick checkbox format |
| `PRE_DEPLOYMENT_NOTES.md` | Technical details |

---

## 💾 Command Cheat Sheet

### Git Commands
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <URL>
git push -u origin main
```

### Local Development
```bash
# Backend
cd backend
npm start

# Frontend  
cd frontend
npm run dev
```

### Check Node Processes (Windows)
```powershell
Get-Process -Name node | Stop-Process -Force
```

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **GitHub Docs**: https://docs.github.com

---

## 🎯 Success Indicators

✅ Backend URL accessible: `https://your-backend.onrender.com`
✅ Shows: `{"message": "BOSSCARS API is running"}`
✅ Frontend loads with animations
✅ Bookings create successfully
✅ Admin login works
✅ Google Sheets updates

---

**Print this page for quick reference during deployment!** 🖨️

Last Updated: October 31, 2025
