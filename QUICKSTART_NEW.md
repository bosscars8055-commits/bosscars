# 🚀 BOSSCARS - Quick Start Guide

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB running (local or Atlas)
- [ ] Google Cloud project setup (optional, for Sheets sync)

---

## 1️⃣ MongoDB Setup (Choose One)

### Option A: Local MongoDB
```bash
# Install MongoDB and start service
# Connection string: mongodb://localhost:27017/bosscars
```

### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bosscars
   ```

---

## 2️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Edit .env file
# Set MONGODB_URI and JWT_SECRET (minimum required)
```

**Minimum .env Configuration**:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bosscars
JWT_SECRET=your_random_32_character_secret_key_here
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
```

```bash
# Start backend
npm start
```

✅ **Success indicators**:
- MongoDB Connected
- Default admin user created
- Server running on http://localhost:5000

---

## 3️⃣ Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 4️⃣ Test the Application

### Test 1: Admin Login
1. Go to: http://localhost:5173/admin
2. Login:
   - Username: `admin`
   - Password: `admin123`
3. Should see admin dashboard ✅

### Test 2: Create Booking
1. Go to: http://localhost:5173
2. Scroll to "Book Your Ride"
3. Fill form and submit
4. Check admin dashboard for new booking ✅

### Test 3: Confirm Booking
1. In admin dashboard, click "Confirm & Send SMS"
2. Check backend terminal for SMS log
3. Status changes to "Confirmed" ✅

---

## 5️⃣ Google Sheets Setup (Optional)

**Follow these steps ONLY if you want Google Sheets integration:**

### Quick Steps:
1. **Create Google Cloud Project**: https://console.cloud.google.com
2. **Enable Google Sheets API**
3. **Create Service Account** → Download JSON key
4. **Create Google Sheet** → Share with service account email
5. **Update .env** with:
   ```env
   GOOGLE_SHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
   ```
6. **Restart backend**
7. **Click "Sync to Sheets"** in admin dashboard

📖 **Detailed Guide**: See `COMPLETE_SETUP_GUIDE.md`

---

## 🎯 Common URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Admin Login | http://localhost:5173/admin |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000 |

---

## 🔑 Default Credentials

**Admin Login**:
- Username: `admin`
- Password: `admin123`

⚠️ **Change password after first login!**

---

## 📂 Important Files

```
backend/
├── .env                    # ⚠️ Configuration (don't commit!)
├── server.js              # Main server
├── models/
│   ├── Admin.js           # Admin user model
│   └── Booking.js         # Booking model
└── routes/
    ├── adminRoutes.js     # Admin API endpoints
    └── bookingRoutes.js   # Booking API endpoints

frontend/
└── src/
    └── pages/
        ├── AdminLogin.jsx     # Login page
        └── AdminDashboard.jsx # Admin panel
```

---

## 🛠️ Troubleshooting

### Backend won't start
- **Check**: MongoDB is running
- **Check**: `.env` file exists with MONGODB_URI
- **Fix**: Verify connection string format

### Can't login to admin
- **Check**: Backend terminal for "Default admin user created"
- **Check**: Using correct credentials (admin/admin123)
- **Fix**: Delete database and restart backend

### Bookings not showing
- **Check**: Backend terminal for errors
- **Check**: Network tab in browser (F12)
- **Fix**: Ensure backend is running on port 5000

### Google Sheets not syncing
- **Check**: All 3 env variables are set correctly
- **Check**: Sheet is shared with service account email
- **Fix**: See detailed guide in `COMPLETE_SETUP_GUIDE.md`

---

## 🚀 Production Deployment

### Environment Variables to Update:
```env
# Use strong JWT secret (32+ chars)
JWT_SECRET=very_long_random_production_secret_key

# Use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://...

# Update CORS in server.js for your domain
```

### Security Checklist:
- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable MongoDB authentication
- [ ] Restrict MongoDB IP access
- [ ] Use HTTPS in production
- [ ] Secure Google service account JSON
- [ ] Update CORS for production domain

---

## 📚 Documentation

- **Complete Setup**: `COMPLETE_SETUP_GUIDE.md`
- **API Reference**: `API_DOCUMENTATION.md`
- **Admin Features**: `ADMIN_FEATURES.md`

---

## 🎉 You're All Set!

Your BOSSCARS application is now running with:
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Admin dashboard
- ✅ Booking management
- ✅ Google Sheets sync (if configured)

**Next Steps**:
1. Create test bookings
2. Test admin features
3. Configure Google Sheets (optional)
4. Customize for your needs

Need help? Check the detailed guides! 🚀
