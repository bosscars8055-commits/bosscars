# BOSSCARS Frontend

Modern car and bus booking website built with React + Vite, Tailwind CSS, and Framer Motion.

## Features

- 🚗 Car and Bus booking system
- 🎨 Clean, modern UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔐 Admin dashboard for managing bookings
- 🎯 Single-page smooth scroll navigation

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

## Installation

```bash
npm install
```

## Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── BookingForm.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── pages/
│   ├── HomePage.jsx
│   └── AdminPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Pages

- **Home** (`/`) - Main user page with all sections
- **Admin** (`/admin`) - Admin dashboard for managing bookings

## Note

Make sure the backend server is running on `http://localhost:5000` for the booking functionality to work.

