# Boss Cars - Ride Like a Boss 🚗

A complete single-page car booking website with admin panel, built with React, Express, and MongoDB.

## 🚀 Features

- **Smooth Single-Page Scrolling**: All sections on one page with smooth navigation
- **Booking System**: Full-featured booking form with validation
- **Auto-Scrolling Services**: Animated carousel showcasing available vehicles
- **Admin Panel**: View all bookings in a dedicated dashboard
- **Word Document Export**: Bookings saved to MongoDB and exported to .docx file
- **Animations**: Framer Motion powered scroll animations, fade-ins, and slide-ins
- **Responsive Design**: Mobile-friendly colourful light theme

## 📁 Project Structure

```
BossCabs/
├── backend/               # Express.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env
├── frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── assets/       # Images and static files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/bosscars
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

5. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 Deployment

### Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Build the project:
```bash
npm run build
```

4. Deploy to Vercel:
```bash
vercel
```

5. Update environment variable on Vercel:
- Go to your Vercel project settings
- Add `VITE_API_URL` with your Render backend URL

### Deploy Backend to Render

1. Push your code to GitHub (if not already)

2. Go to [Render.com](https://render.com) and sign in

3. Click "New +" → "Web Service"

4. Connect your GitHub repository

5. Configure the service:
   - **Name**: boss-cars-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: 5000 (or leave default)
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: admin123

7. Click "Create Web Service"

8. After deployment, copy your Render URL (e.g., `https://boss-cars-backend.onrender.com`)

9. Update frontend `.env` and Vercel environment variable with this URL

## 🎨 Features Breakdown

### Frontend Sections

1. **Navbar**
   - Sticky navigation with smooth scrolling
   - Links: Home, Book Now, Our Services, About Us, Contact Us

2. **Home Section**
   - Gradient background with hero text
   - "Ride Like a Boss" tagline
   - CTA button with animations

3. **Book Now Section**
   - Form fields: Name, Mobile, Email, Pickup, Drop-off, Vehicle
   - Indian phone number validation (10 digits)
   - Email format validation
   - API integration with success alerts

4. **Our Services Section**
   - Auto-scrolling carousel
   - Vehicle cards: Swift Dzire (4+1), Innova (6+1), Honda City (4+1)
   - Images, descriptions, and capacity info

5. **About Us Section**
   - Company mission and values
   - Fade-in animations

6. **Contact Us Section**
   - Location, phone, email
   - Contact form
   - Optional Google Maps embed

### Backend API Endpoints

- `POST /api/book` - Create new booking
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/bookings` - Get all bookings (admin only)

### Admin Panel

- Route: `/admin`
- Login with credentials from .env
- View all bookings in table format
- No edit/delete functionality

## 🎭 Vehicles Available

- **Swift Dzire** - 4+1 Seating
- **Innova** - 6+1 Seating
- **Honda City** - 4+1 Seating

## 📝 Admin Credentials

Default credentials (change in .env):
- Username: `admin`
- Password: `admin123`

## 🔧 Technologies Used

**Frontend:**
- React 18
- Vite
- Framer Motion (animations)
- Axios (HTTP requests)
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- docx (Word document generation)
- bcryptjs (password hashing)
- CORS

## 📱 Responsive Design

Fully responsive design optimized for:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎨 Color Scheme

Light and colorful theme with:
- Gradient backgrounds
- Vibrant accent colors
- Professional and modern UI

## 🤝 Support

For issues or questions, contact us at the details provided in the Contact Us section.

## 📄 License

This project is for Boss Cars. All rights reserved.
