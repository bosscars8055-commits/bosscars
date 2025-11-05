# 🚀 BOSSCARS - Getting Started

## ✅ Everything is Ready!

Your BOSSCARS application has been upgraded with:
- ✅ MongoDB Database
- ✅ JWT Admin Authentication  
- ✅ Google Sheets Integration

---

## 🎯 Quick Start (2 Minutes)

### Step 1: Start MongoDB (if not already running)

MongoDB is already installed on your system. It should be running automatically.

To verify:
```bash
mongosh
# If connected, you're good! Type "exit" to quit.
```

### Step 2: Start Backend

```bash
cd backend
node server.js
```

✅ **Look for these success messages**:
```
✅ MongoDB Connected: localhost
📊 Database: bosscars
✅ Default admin user created
   Username: admin
   Password: admin123
Server is running on http://localhost:5000
```

### Step 3: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

### Step 4: Login to Admin Dashboard

1. Open: http://localhost:5173/admin
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. 🎉 You're in!

---

## 🧪 Test the Features

### Test 1: Create a Booking
1. Go to home page: http://localhost:5173
2. Scroll to "Book Your Ride"
3. Fill the form:
   - Select Car or Bus
   - Enter pickup/drop locations
   - Select date and time
   - Enter mobile: `9876543210`
   - (Email is optional)
4. Submit
5. Check backend terminal - you'll see SMS log
6. Check admin dashboard - booking appears!

### Test 2: Confirm a Booking
1. In admin dashboard, find your booking
2. Click "Confirm & Send SMS"
3. Check backend terminal for SMS confirmation
4. Status changes to "Confirmed" ✅

### Test 3: Google Sheets (Optional)

**If you want to enable Google Sheets sync:**

1. Follow the setup guide in `COMPLETE_SETUP_GUIDE.md`
2. Update your `backend/.env` file with Google credentials
3. Restart backend server
4. In admin dashboard, click "Sync to Sheets"
5. Check your Google Sheet!

**Don't need it now?** The app works perfectly without Google Sheets!

---

## 📋 Default Credentials

**Admin Login:**
- Username: `admin`
- Password: `admin123`

⚠️ **Important**: Change the password after first login!

---

## 🌐 Application URLs

| Service | URL |
|---------|-----|
| **Home Page** | http://localhost:5173 |
| **Admin Login** | http://localhost:5173/admin |
| **Admin Dashboard** | http://localhost:5173/admin/dashboard |
| **Backend API** | http://localhost:5000 |

---

## 📊 What's Working

### ✅ User Features:
- Smooth single-page navigation
- Car and bus booking forms
- Mobile number required, email optional
- SMS notifications (logged to console)
- Form validation
- Responsive design

### ✅ Admin Features:
- Secure JWT authentication
- View all bookings with search
- Filter by status (pending/confirmed)
- Sort by date, time, created date
- Confirm bookings (sends SMS)
- Delete bookings
- Sync to Google Sheets (when configured)

### ✅ Database:
- MongoDB persistent storage
- Automatic admin user creation
- Booking data with timestamps
- Password hashing with bcrypt

---

## 🔧 Environment Configuration

Your current `.env` file has:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bosscars
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123

# Google Sheets (optional - not configured yet)
# GOOGLE_SHEETS_CLIENT_EMAIL=...
# GOOGLE_SHEETS_PRIVATE_KEY=...
# GOOGLE_SHEETS_SPREADSHEET_ID=...
```

**To use Google Sheets:**
- Follow `COMPLETE_SETUP_GUIDE.md` Part 2
- Uncomment and fill the Google Sheets variables
- Restart the server

---

## 🛠️ Troubleshooting

### Backend won't start
**Error**: "MongoDB connection failed"
- **Check**: MongoDB service is running
- **Try**: `mongosh` to test connection
- **Fix**: Start MongoDB service

**Error**: "Cannot find module"
- **Fix**: Run `npm install` in backend folder

### Can't login to admin
**Error**: "Invalid credentials"
- **Check**: Using `admin` / `admin123`
- **Check**: Backend terminal shows "Default admin user created"
- **Fix**: Delete database and restart: 
  ```bash
  mongosh
  > use bosscars
  > db.dropDatabase()
  > exit
  ```
  Then restart backend

### Frontend not loading
**Error**: "Cannot connect to backend"
- **Check**: Backend is running on port 5000
- **Check**: No CORS errors in browser console (F12)
- **Fix**: Ensure backend started successfully

---

## 📚 Documentation

Need more help? Check out:

| Document | What's Inside |
|----------|---------------|
| **QUICKSTART_NEW.md** | 5-minute setup guide |
| **COMPLETE_SETUP_GUIDE.md** | Detailed MongoDB & Google Sheets setup |
| **API_DOCUMENTATION.md** | Complete API reference |
| **IMPLEMENTATION_SUMMARY.md** | What was implemented |

---

## 🎓 Next Steps

### Immediate:
1. ✅ Test booking creation
2. ✅ Test admin dashboard
3. ✅ Confirm a booking
4. 📋 (Optional) Set up Google Sheets

### Optional Enhancements:
- Change default admin password
- Set up real SMS gateway (Twilio, MSG91)
- Configure Google Sheets sync
- Add more admin users
- Customize UI colors and branding
- Deploy to production

---

## 🎉 You're All Set!

Your BOSSCARS application is now running with:
- ✅ Persistent MongoDB database
- ✅ Secure JWT authentication
- ✅ Admin dashboard with full booking management
- ✅ Ready for Google Sheets integration

**Have fun testing!** 🚗🚌

---

## 💡 Pro Tips

1. **Keep backend terminal visible** to see SMS logs and errors
2. **Use browser dev tools (F12)** to debug frontend issues
3. **Check MongoDB** with `mongosh` to view data directly
4. **Backup your .env file** but never commit it to Git
5. **Change JWT_SECRET** to a long random string for production

---

## 📞 Need Help?

1. Check terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify MongoDB is running: `mongosh`
4. Review documentation files
5. Check `.env` configuration

---

**Happy Coding!** 🚀

Last Updated: October 30, 2025
