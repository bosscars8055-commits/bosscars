# 🚗 BossCars - One Way Drop Taxi Booking Platform

> **Website Domain**: bossonewaydroptaxi.com  
> **Brand Name**: BossCars - *Ride like a Boss*

A modern, feature-rich car and bus booking platform built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/cloud/atlas)

## ✨ Features

### 🎨 User Features
- **Smooth Navigation**: Single-page layout with smooth scroll between sections
- **Smart Booking System**: Easy-to-use booking form with car/bus selection
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for delightful user experience
- **Modern UI**: Clean interface styled with Tailwind CSS
- **SMS Notifications**: Instant booking confirmations via SMS

### 🔐 Admin Features
- **Secure Authentication**: JWT-based login system with password hashing
- **Admin Dashboard**: View and manage all bookings in real-time
- **Booking Management**: Confirm or delete bookings with one click
- **Google Sheets Integration**: Automatic sync of booking data to Google Sheets
- **Advanced Filters**: Search and filter bookings by status, location, and more
- **Real-time Updates**: Instant feedback and SMS notifications to customers

### 🗄️ Database & Storage
- **MongoDB Database**: Persistent storage for bookings and admin users
- **Google Sheets Sync**: Real-time synchronization for easy data access
- **Secure Authentication**: Bcrypt password hashing and JWT tokens

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Google Sheets API** - Data synchronization
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
BOSSCARS/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Admin.js             # Admin user model
│   │   └── Booking.js           # Booking model
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin API endpoints
│   │   └── bookingRoutes.js     # Booking API endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── services/
│   │   └── googleSheets.js      # Google Sheets integration
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   └── server.js                # Main server file
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AdminLogin.jsx      # Secure login page
│   │   │   ├── AdminDashboard.jsx  # Admin panel
│   │   │   └── AdminPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── Documentation/
    ├── README.md                    # This file
    ├── QUICKSTART_NEW.md            # Quick setup guide
    ├── COMPLETE_SETUP_GUIDE.md      # Detailed setup instructions
    └── API_DOCUMENTATION.md         # API reference
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas account)
- **Google Cloud Account** (optional, for Sheets sync)

### 5-Minute Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BOSSCARS
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Copy and configure environment variables
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Admin Login: http://localhost:5173/admin
   - Default credentials: admin / admin123

📖 **Need detailed setup?** See [QUICKSTART_NEW.md](QUICKSTART_NEW.md) or [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)

## 🔑 Environment Variables

Create a `.env` file in the `backend` folder:

```env
# Required
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bosscars
JWT_SECRET=your_random_32_character_secret_key

# Default Admin (auto-created on first start)
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123

# Optional - Google Sheets Integration
GOOGLE_SHEETS_CLIENT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
```

See `.env.example` for complete template.

## 🌐 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main user interface |
| Admin Login | http://localhost:5173/admin | Secure admin login |
| Admin Dashboard | http://localhost:5173/admin/dashboard | Admin panel |
| Backend API | http://localhost:5000 | REST API server |

## 📱 Main Features

### User Pages

#### Home Page (`/`)
- **Home**: Welcome banner with call-to-action
- **Our Services**: Car and bus service descriptions
- **Book Your Ride**: Interactive booking form
- **About Us**: Vehicle information
- **Contact**: Contact form and details

**Booking Form Features:**
- Car or Bus selection
- Pickup and drop locations
- Date and time picker
- Mobile number (required, 10 digits)
- Email (optional)
- Real-time validation
- SMS confirmation

### Admin Pages

#### Admin Login (`/admin`)
- Secure JWT-based authentication
- Password hashing with bcrypt
- Session management
- Protected routes

#### Admin Dashboard (`/admin/dashboard`)
- **Statistics Cards**: Total, pending, confirmed bookings
- **Search & Filter**: 
  - Search by location, mobile, ID
  - Filter by status (all/pending/confirmed)
  - Sort by date, time, created date
- **Booking Management**:
  - View all booking details
  - Confirm bookings (sends SMS)
  - Delete bookings
  - Real-time status updates
- **Google Sheets Sync**: 
  - One-click sync to Google Sheets
  - Automatic sync on new bookings
  - View data anytime in spreadsheet

## 🎨 Design Features

- **Color Scheme**: Professional blue gradient theme
- **Typography**: Clean, readable fonts
- **Animations**: Smooth fade-in, slide, and hover effects using Framer Motion
- **Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Modern UI**: Material design principles with Tailwind CSS

## � API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all bookings |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/:id` | Get booking by ID |

### Admin Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login (get JWT) |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/verify` | Verify JWT token |
| GET | `/api/admin/bookings` | Get all bookings |
| PUT | `/api/admin/bookings/:id/confirm` | Confirm booking + SMS |
| DELETE | `/api/admin/bookings/:id` | Delete booking |
| POST | `/api/admin/sync-sheets` | Sync to Google Sheets |

📖 **Full API Documentation**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🔒 Security Features

- **JWT Authentication**: Token-based secure admin access
- **Password Hashing**: Bcrypt with salt rounds
- **Protected Routes**: Middleware authentication checks
- **Input Validation**: Server-side and client-side validation
- **CORS Protection**: Configured for specific origins
- **Environment Variables**: Sensitive data in .env files

## 📊 Database Schema

### Booking Model
```javascript
{
  type: String,           // "car" or "bus"
  pickupLocation: String,
  dropLocation: String,
  date: String,           // YYYY-MM-DD
  time: String,           // HH:MM
  email: String,          // Optional
  mobile: String,         // Required, 10 digits
  status: String,         // "pending", "confirmed", "cancelled"
  syncedToSheet: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Model
```javascript
{
  username: String,       // Unique
  password: String,       // Hashed
  email: String,
  role: String,           // "admin" or "superadmin"
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | 🚀 **Complete deployment guide for Render & Vercel** |
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | ✅ Quick 30-minute deployment checklist |
| [PRE_DEPLOYMENT_NOTES.md](PRE_DEPLOYMENT_NOTES.md) | 📝 Important notes before deployment |
| [QUICKSTART_NEW.md](QUICKSTART_NEW.md) | Quick 5-minute local setup guide |
| [COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md) | Detailed setup with MongoDB & Google Sheets |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Complete API reference |
| [ADMIN_FEATURES.md](ADMIN_FEATURES.md) | Admin dashboard guide |

## 🌐 Deployment

### Production Hosting

**Backend**: [Render](https://render.com) (Free tier available)
**Frontend**: [Vercel](https://vercel.com) (Free tier available)
**Database**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free 512MB cluster)

### Quick Deploy Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy Backend on Render**
   - Sign up with GitHub
   - Create Web Service from repository
   - Set root directory: `backend`
   - Add environment variables
   - Deploy!

3. **Deploy Frontend on Vercel**
   - Import GitHub repository
   - Set root directory: `frontend`
   - Add `VITE_API_URL` environment variable
   - Deploy!

4. **Update CORS**
   - Update `FRONTEND_URL` in Render with Vercel URL
   - Redeploy backend

📖 **See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions**

### Deployment Features
- ✅ Automatic HTTPS
- ✅ Continuous deployment from GitHub
- ✅ Environment variables management
- ✅ Real-time logs and monitoring
- ✅ Free tier available for both platforms
- ✅ Custom domain support

## 📝 Future Enhancements

- Real map integration for distance calculation
- Payment gateway integration
- User authentication
- Database integration (MongoDB/PostgreSQL)
- Email notifications
- SMS alerts
- Booking history
- User profiles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Support

For support, email info@bosscars.com or create an issue in the repository.

---

Made with ❤️ by BOSSCARS Team
