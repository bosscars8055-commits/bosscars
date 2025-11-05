# BOSSCARS Project - Copilot Instructions

## Project Overview
BOSSCARS is a modern car and bus booking website with a React + Vite frontend and Node.js + Express backend.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router DOM
- **Backend**: Node.js, Express, CORS

## Project Structure
- `frontend/` - React application with Vite
  - `src/components/` - Reusable UI components (Navbar, Hero, Services, BookingForm, About, Contact)
  - `src/pages/` - Page components (HomePage, AdminPage)
- `backend/` - Express API server
  - `routes/` - API routes (bookingRoutes.js, adminRoutes.js)
  - `server.js` - Main server file

## Running the Application

### Backend Server
```bash
cd backend
npm start
```
Runs on: http://localhost:5000

### Frontend Server
```bash
cd frontend
npm run dev
```
Runs on: http://localhost:5173

## Key Features
1. **User Page**: Single-page layout with smooth scroll navigation (Home, Services, Book, About, Contact)
2. **Booking System**: Dynamic form with car/bus selection, validation, and API integration
3. **Admin Dashboard**: View, confirm, and delete bookings
4. **Animations**: Framer Motion for smooth transitions and interactions
5. **Responsive Design**: Mobile-first Tailwind CSS styling

## Development Guidelines
- All styling uses Tailwind CSS utility classes
- Use Framer Motion for animations (motion components with initial, animate, transition props)
- Backend uses in-memory data storage (no database yet)
- Form validation on both client and server side
- CORS enabled for local development

## Future Enhancements
- Map integration for distance calculation
- Database integration
- User authentication
- Payment gateway
- Email/SMS notifications

