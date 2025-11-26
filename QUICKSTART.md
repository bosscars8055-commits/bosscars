# Boss Cars - Quick Start Guide

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or Atlas)
- Git

### Installation

#### 1. Clone or navigate to the project
```bash
cd "c:\Users\sarav\Desktop\BossCabs"
```

#### 2. Set up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your MongoDB connection string
# Open .env in notepad and update:
# MONGODB_URI=your_mongodb_connection_string
# PORT=5000
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=admin123

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Set up Frontend

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file (should already have the correct value)
# VITE_API_URL=http://localhost:5000

# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Access the Application

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Backend API**: http://localhost:5000

### 5. Default Admin Credentials

- **Username**: admin
- **Password**: admin123

(Change these in `.env` file for security)

---

## 📁 Project Structure

```
BossCabs/
├── backend/                # Express.js backend
│   ├── models/            # MongoDB schemas
│   │   ├── Admin.js       # Admin user schema
│   │   └── Booking.js     # Booking schema
│   ├── routes/            # API routes
│   │   ├── adminRoutes.js # Admin endpoints
│   │   └── bookingRoutes.js # Booking endpoints
│   ├── utils/             # Utility functions
│   │   └── wordGenerator.js # Word doc generator
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
│
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Navbar.jsx & .css
│   │   │   ├── HeroSection.jsx & .css
│   │   │   ├── BookingSection.jsx & .css
│   │   │   ├── ServicesSection.jsx & .css
│   │   │   ├── AboutSection.jsx & .css
│   │   │   └── ContactSection.jsx & .css
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── AdminPage.css
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── package.json       # Frontend dependencies
│   └── .env               # Environment variables
│
├── README.md              # Main documentation
├── DEPLOYMENT.md          # Deployment guide
└── QUICKSTART.md          # This file
```

---

## 🎨 Features Implemented

### ✅ Frontend Features
- **Navbar**: Sticky navigation with smooth scrolling
- **Hero Section**: Animated landing with gradient background
- **Booking Form**: Complete form with validation
  - Indian mobile number validation (10 digits)
  - Email format validation
  - Vehicle selection dropdown
  - Success/error messages
- **Services Section**: Auto-scrolling carousel with car cards
- **About Section**: Company information with feature boxes
- **Contact Section**: Contact information and form
- **Admin Panel**: Login and bookings dashboard
- **Animations**: Framer Motion scroll animations throughout
- **Responsive Design**: Mobile-friendly on all screen sizes

### ✅ Backend Features
- **Express Server**: RESTful API with CORS enabled
- **MongoDB Integration**: Mongoose schemas for bookings and admin
- **Booking API**: POST endpoint to create bookings
- **Admin Authentication**: Login endpoint with bcrypt password hashing
- **Admin Dashboard API**: GET endpoint to retrieve all bookings
- **Word Document Export**: Automatic .docx file generation for each booking
- **Validation**: Server-side validation for all inputs

### ✅ Database Features
- **Booking Collection**: Stores all booking details
- **Admin Collection**: Stores admin credentials (hashed passwords)
- **Automatic Indexing**: MongoDB indexes for better performance

---

## 🧪 Testing

### Test Booking Flow

1. Open http://localhost:3000
2. Scroll to "Book Now" section
3. Fill in the form:
   - Name: Test User
   - Mobile: 9876543210
   - Email: test@example.com
   - Pickup: Mumbai
   - Drop-off: Pune
   - Vehicle: Swift Dzire
4. Click "Book Now"
5. Verify success message appears

### Test Admin Panel

1. Go to http://localhost:3000/admin
2. Login with:
   - Username: admin
   - Password: admin123
3. Verify booking appears in dashboard
4. Check backend folder for `bookings.docx` file

### Test API Directly

```bash
# Test health check
curl http://localhost:5000/

# Test booking (PowerShell)
Invoke-RestMethod -Uri "http://localhost:5000/api/book" -Method Post -ContentType "application/json" -Body '{"name":"Test","mobile":"9876543210","email":"test@test.com","pickupLocation":"Mumbai","dropoffLocation":"Pune","vehicle":"Swift Dzire"}'
```

---

## 🛠️ Common Issues & Solutions

### Backend won't start

**Error**: "Cannot connect to MongoDB"
- **Solution**: Check MongoDB is running or update connection string in `.env`

**Error**: "Port 5000 already in use"
- **Solution**: Change PORT in `.env` or kill process using port 5000

### Frontend won't start

**Error**: "Cannot connect to backend"
- **Solution**: Ensure backend is running on http://localhost:5000
- **Solution**: Check `VITE_API_URL` in frontend `.env` file

### Booking submission fails

**Error**: "Network Error"
- **Solution**: Verify backend is running
- **Solution**: Check CORS is enabled in backend

**Error**: "Validation Error"
- **Solution**: Check mobile number is 10 digits starting with 6-9
- **Solution**: Check email format is valid

### Admin login fails

**Error**: "Invalid credentials"
- **Solution**: Check username and password in backend `.env` file
- **Solution**: Delete admin from MongoDB and restart backend to recreate

---

## 📝 Available Scripts

### Backend

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🌟 Next Steps

1. **Test Everything**: Go through all features
2. **Customize**: Update colors, text, images as needed
3. **Deploy**: Follow DEPLOYMENT.md to deploy to production
4. **Monitor**: Check bookings in admin panel regularly

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

## 🎉 You're All Set!

Your Boss Cars application is ready to use. Start the backend and frontend servers, and visit http://localhost:3000 to see your website in action!

For deployment to production, refer to `DEPLOYMENT.md`.

**Ride Like a Boss! 🚗**
