# 🚗 Boss Cars - Car Booking System

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7)](https://render.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)](https://www.mongodb.com)

A modern, full-stack car booking system built with React, Node.js, and MongoDB. Features real-time booking management with data storage in both MongoDB Atlas and Google Sheets.

## ✨ Features

- 🚙 **Vehicle Selection**: Cars (Sedan, Swift Dzire, Innova, Honda City) and Travel Buses
- 📅 **Real-time Booking**: Instant booking with date and time selection
- 💾 **Dual Storage**: Data saved to both MongoDB Atlas and Google Sheets
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Performance**: Built with Vite for lightning-fast loading
- 🎨 **Modern UI**: Smooth animations with Framer Motion
- ✅ **Form Validation**: Comprehensive validation for all booking fields

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB + Mongoose** - Database
- **Google Apps Script** - Sheets integration
- **DOCX** - Word document generation

## 📁 Project Structure

```
BossCabs/
├── frontend/                # React frontend
│   ├── public/
│   │   └── images/         # All images (logo, cars, backgrounds)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   └── main.jsx        # Entry point
│   └── package.json
│
├── backend/                # Node.js backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json
│
└── DEPLOYMENT_INSTRUCTIONS.md  # Deployment guide
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account
- Google account (for Sheets integration)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/YOUR_USERNAME/bosscars.git
cd bosscars
```

2. **Setup Backend**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm start
```

3. **Setup Frontend**:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (default uses localhost:5000)
npm run dev
```

4. **Access the application**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🌐 Deployment

See [DEPLOYMENT_INSTRUCTIONS.md](./DEPLOYMENT_INSTRUCTIONS.md) for detailed deployment guide.

### Quick Deployment Summary:

1. **Backend → Render**:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add MongoDB URI in environment variables

2. **Frontend → Vercel**:
   - Root Directory: `frontend`
   - Framework: Vite
   - Build: `npm run build`
   - Add backend URL in environment variables

## 📸 Screenshots

### Homepage
Beautiful landing page with hero section and vehicle showcase.

### Booking Form
Easy-to-use booking form with real-time validation.

### Services Section
Display of available vehicles with auto-scrolling carousel.

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

**Frontend (.env)**:
```env
VITE_API_URL=https://your-backend.onrender.com
```

## 📝 API Endpoints

### Bookings
- `POST /api/book` - Create new booking

### Health Check
- `GET /` - Server health check

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Website: [bosscars.com](https://bosscars.vercel.app)

## 🙏 Acknowledgments

- Vehicle images from [source]
- UI inspiration from modern booking platforms
- Icons and graphics from [source]

---

Made with ❤️ by Boss Cars Team
