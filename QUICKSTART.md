# BOSSCARS - Quick Start Guide

## 🎉 Your Application is Ready!

Both servers are currently running:
- **Backend**: http://localhost:5000 ✅
- **Frontend**: http://localhost:5173 ✅

## 🚀 Access Your Application

Simply open your browser and navigate to:
```
http://localhost:5173
```

## 📋 Available Features

### Main User Page (/)
1. **Home Section** - Welcome banner with "Book Now" button
2. **Our Services** - Display of car and bus services
3. **Book Section** - Interactive booking form:
   - Select between Car Travel or Bus Tour
   - Enter pickup/drop locations, date, time
   - Email and mobile number with validation
   - Placeholder for map view
4. **About Us** - Information about available vehicles
5. **Contact Us** - Contact form and company details

### Admin Dashboard (/admin)
- View all bookings with detailed information
- **Statistics Dashboard**: Total, Pending, and Confirmed bookings count
- **Search Functionality**: Search by location, mobile number, email, or booking ID
- **Sort Options**: 
  - By booking date & time
  - By created date (newest first)
  - By status
  - By time only
- **Filter by Status**: View all, pending only, or confirmed only bookings
- **Booking Details Display**:
  - Route information (pickup/drop locations)
  - Date and time of journey
  - Mobile number (required)
  - Email (optional - shown only if provided)
  - Created timestamp
  - Confirmed timestamp (for confirmed bookings)
- Confirm pending bookings (sends SMS to customer)
- Delete bookings
- Real-time updates

## 🛠️ If You Need to Restart

### Stop the Servers
Press `Ctrl+C` in each terminal to stop the servers.

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## 📝 Test the Application

1. **Visit the homepage** at http://localhost:5173
2. **Scroll through sections** - Notice smooth scroll animations
3. **Create a booking**:
   - Click "Book Now" or navigate to Book section
   - Select Car Travel or Bus Tour
   - Fill in all required fields:
     - Mobile number (required - 10 digits)
     - Email (optional)
   - Submit the form
   - You'll see a success message and SMS will be logged in backend console
4. **Visit Admin Dashboard**:
   - Click "Admin Login" in navbar
   - View statistics (Total, Pending, Confirmed)
   - Use search to find specific bookings
   - Sort bookings by date, time, status, or created date
   - Filter by status (All, Pending, Confirmed)
   - Confirm a booking (SMS notification will be logged)
   - Delete a booking if needed

## 🎨 Customization Tips

### Change Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',    // Main blue color
  secondary: '#1e40af',  // Darker blue
  accent: '#3b82f6',     // Light blue
}
```

### Modify Content
- **Navbar**: `frontend/src/components/Navbar.jsx`
- **Hero Banner**: `frontend/src/components/Hero.jsx`
- **Services**: `frontend/src/components/Services.jsx`
- **Booking Form**: `frontend/src/components/BookingForm.jsx`
- **About**: `frontend/src/components/About.jsx`
- **Contact**: `frontend/src/components/Contact.jsx`

### Backend API
- **Booking Routes**: `backend/routes/bookingRoutes.js`
- **Admin Routes**: `backend/routes/adminRoutes.js`
- **Server Config**: `backend/server.js`

## 📚 Next Steps

1. **Add Database**: Replace in-memory storage with MongoDB or PostgreSQL
2. **Add Authentication**: Implement user login and sessions
3. **Integrate Maps**: Add real map API for distance calculation
4. **Payment Gateway**: Add payment processing
5. **Email Notifications**: Send booking confirmations via email

## 🐛 Troubleshooting

### Port Already in Use
If you get a port error:
- Backend: Change PORT in `backend/server.js`
- Frontend: Change port in `frontend/vite.config.js`

### Missing Dependencies
```bash
cd frontend
npm install

cd ../backend
npm install
```

### Clear Cache
```bash
cd frontend
rm -rf node_modules
npm install
```

## 📖 Documentation

- Full README: `README.md`
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- Copilot Instructions: `.github/copilot-instructions.md`

---

**Enjoy building with BOSSCARS! 🚗🚌**
