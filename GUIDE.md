# 🚗 Boss Cars - Complete Installation & Usage Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Features Guide](#features-guide)
6. [API Documentation](#api-documentation)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation, OR
  - MongoDB Atlas account (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)
- **Code Editor** (VS Code recommended)

### Verify Installation

Open PowerShell and run:

```powershell
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
```

---

## Installation

### Method 1: Automated Setup (Recommended)

1. Open PowerShell as Administrator
2. Navigate to the project directory:
   ```powershell
   cd "c:\Users\sarav\Desktop\BossCabs"
   ```

3. Run the setup script:
   ```powershell
   .\setup.ps1
   ```

This will automatically install all dependencies for both backend and frontend.

### Method 2: Manual Setup

**Install Backend Dependencies:**
```powershell
cd backend
npm install
```

**Install Frontend Dependencies:**
```powershell
cd ../frontend
npm install
```

---

## Configuration

### Step 1: Configure MongoDB

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a free cluster
4. Create database user with password
5. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
6. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bosscars
   ```

#### Option B: Local MongoDB

If running MongoDB locally:
```
mongodb://localhost:27017/bosscars
```

### Step 2: Configure Backend

Edit `backend\.env`:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/bosscars
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123
NODE_ENV=development
```

**Important**: Replace the MongoDB URI with your actual connection string!

### Step 3: Configure Frontend

Edit `frontend\.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production, this should be your deployed backend URL.

---

## Running the Application

### Method 1: Quick Start Script

```powershell
cd "c:\Users\sarav\Desktop\BossCabs"
.\start.ps1
```

This opens two PowerShell windows:
- One for the backend server
- One for the frontend server

### Method 2: Manual Start

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

Wait for: `✅ Connected to MongoDB` and `🚀 Boss Cars server running on port 5000`

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:3000`

### Access the Application

- **Main Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000

---

## Features Guide

### 1. Homepage Navigation

The website is a single-page application with smooth scrolling sections:

- **Home** - Landing page with hero section
- **Book Now** - Booking form
- **Our Services** - Vehicle showcase
- **About Us** - Company information
- **Contact Us** - Contact details and form

### 2. Making a Booking

1. Navigate to the **Book Now** section
2. Fill in the form:
   - **Name**: Your full name
   - **Mobile**: 10-digit Indian mobile number (must start with 6-9)
   - **Email**: Valid email address
   - **Pickup Location**: Starting point
   - **Drop-off Location**: Destination
   - **Vehicle**: Choose from Swift Dzire, Innova, or Honda City

3. Click **Book Now**
4. Wait for success message
5. Booking is saved to:
   - MongoDB database
   - Word document (`backend/bookings.docx`)

### 3. Admin Panel

#### Accessing Admin Panel

1. Go to http://localhost:3000/admin
2. Enter credentials:
   - **Username**: admin
   - **Password**: admin123 (or your custom password from .env)

#### Admin Features

- **Dashboard Statistics**:
  - Total bookings
  - Today's bookings
  - Vehicle-wise breakdown

- **Bookings Table**:
  - View all booking details
  - Sorted by most recent first
  - Responsive table design

- **Actions**:
  - Refresh bookings list
  - Logout
  - Return to home

### 4. Vehicle Services

Three vehicles available:

1. **Swift Dzire**
   - Seating: 4+1
   - Best for: City rides, short trips
   - Features: AC, Music System, Comfortable Seats

2. **Innova**
   - Seating: 6+1
   - Best for: Family trips, group travel
   - Features: AC, Spacious, Premium Comfort

3. **Honda City**
   - Seating: 4+1
   - Best for: Business and leisure travel
   - Features: AC, Premium Interior, Smooth Ride

---

## API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "message": "Boss Cars API is running!",
  "status": "active",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

#### 2. Create Booking
```http
POST /api/book
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "pickupLocation": "Mumbai",
  "dropoffLocation": "Pune",
  "vehicle": "Swift Dzire"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Booking created successfully!",
  "booking": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "vehicle": "Swift Dzire",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid mobile number. Please enter a valid 10-digit Indian mobile number"
}
```

#### 3. Admin Login
```http
POST /api/admin/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin"
  }
}
```

#### 4. Get All Bookings
```http
GET /api/admin/bookings
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "mobile": "9876543210",
      "email": "john@example.com",
      "pickupLocation": "Mumbai",
      "dropoffLocation": "Pune",
      "vehicle": "Swift Dzire",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Deployment

### Production Deployment

See **DEPLOYMENT.md** for complete step-by-step guide to deploy to:

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

Quick deployment checklist:

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Configure environment variables
5. ✅ Update API URLs
6. ✅ Test live application

---

## Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `Cannot connect to MongoDB`

**Solutions:**
1. Verify MongoDB connection string in `backend\.env`
2. Check MongoDB Atlas IP whitelist
3. Ensure database user credentials are correct
4. Test connection string in MongoDB Compass

**Problem**: `Port 5000 already in use`

**Solutions:**
1. Find and kill process using port 5000:
   ```powershell
   Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
   ```
2. Or change PORT in `backend\.env`

**Problem**: `Admin login fails`

**Solutions:**
1. Check credentials in `backend\.env`
2. Delete admin from MongoDB and restart backend
3. Verify bcrypt is installed: `npm list bcryptjs`

#### Frontend Issues

**Problem**: `Cannot connect to backend`

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `VITE_API_URL` in `frontend\.env`
3. Check CORS settings in backend
4. Look for errors in browser console (F12)

**Problem**: `Booking form submission fails`

**Solutions:**
1. Check mobile number format (10 digits, starts with 6-9)
2. Verify email format
3. Ensure all fields are filled
4. Check network tab in browser DevTools

**Problem**: `Animations not working`

**Solutions:**
1. Clear browser cache
2. Verify framer-motion is installed
3. Check browser console for errors

#### Database Issues

**Problem**: `Bookings not saving to database`

**Solutions:**
1. Check MongoDB connection
2. Verify database user has write permissions
3. Check backend console for errors
4. Test with MongoDB Compass

**Problem**: `Word document not created`

**Solutions:**
1. Check backend console for errors
2. Verify docx package is installed
3. Check file permissions in backend folder
4. Look for `bookings.docx` in backend directory

### Getting More Help

1. Check logs in terminal/console
2. Review error messages carefully
3. Verify all environment variables
4. Ensure all dependencies are installed
5. Test API endpoints directly using Postman or browser

---

## Development Tips

### Code Structure

**Backend:**
```
backend/
├── models/          # Database schemas
├── routes/          # API endpoints
├── utils/           # Helper functions
└── server.js        # Main server file
```

**Frontend:**
```
frontend/src/
├── components/      # Reusable components
├── pages/          # Page components
├── App.jsx         # Main app router
└── index.css       # Global styles
```

### Making Changes

1. **Update Backend:**
   - Modify files in `backend/`
   - Server auto-restarts (nodemon)
   - Test API with Postman

2. **Update Frontend:**
   - Modify files in `frontend/src/`
   - Browser auto-refreshes
   - Check browser console for errors

### Best Practices

1. Always test locally before deploying
2. Keep environment variables secure
3. Use meaningful commit messages
4. Test on multiple browsers
5. Verify responsive design on mobile

---

## Performance Tips

1. **Optimize Images**: Use SVG or compressed images
2. **Enable Caching**: Set appropriate cache headers
3. **Minify Code**: Use production build
4. **Database Indexing**: Add indexes to frequently queried fields
5. **Monitor Performance**: Use Vercel Analytics

---

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS in production
- [ ] Validate all user inputs
- [ ] Implement rate limiting (future)
- [ ] Regular security updates
- [ ] Backup database regularly

---

## Support & Resources

### Documentation
- **README.md** - Project overview
- **QUICKSTART.md** - Quick start guide
- **DEPLOYMENT.md** - Deployment instructions
- **PROJECT_SUMMARY.md** - Feature summary

### External Resources
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Framer Motion](https://www.framer.com/motion)

---

## Version Information

- **Node.js**: v18+
- **React**: v18.2.0
- **Vite**: v5.0.0
- **Express**: v4.18.2
- **MongoDB**: v8.0.0
- **Framer Motion**: v10.16.4

---

## License

This project is created for Boss Cars. All rights reserved.

---

**🎉 You're all set! Start accepting bookings with Boss Cars! 🚗**

For questions or issues, refer to the troubleshooting section or check the documentation files.

**Ride Like a Boss!**
