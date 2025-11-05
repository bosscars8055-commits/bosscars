# BOSSCARS Backend

Backend API for the BOSSCARS booking system.

## Installation

```bash
npm install
```

## Running the server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking by ID

### Admin
- `GET /api/admin/bookings` - Get all bookings (admin view)
- `PUT /api/admin/bookings/:id/confirm` - Confirm a booking
- `DELETE /api/admin/bookings/:id` - Delete a booking
