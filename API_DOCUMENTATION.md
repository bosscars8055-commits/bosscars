# BOSSCARS - API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication

All admin routes require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📝 Public Endpoints

### 1. Create Booking

**Endpoint**: `POST /bookings`

**Description**: Create a new booking (car or bus)

**Request Body**:
```json
{
  "type": "car",              // Required: "car" or "bus"
  "pickupLocation": "Mumbai Airport",
  "dropLocation": "Pune Station",
  "date": "2025-11-01",       // Required: YYYY-MM-DD
  "time": "10:00",            // Required: HH:MM
  "email": "user@example.com", // Optional
  "mobile": "9876543210"      // Required: 10-digit number
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Booking created successfully! SMS confirmation sent to your mobile.",
  "booking": {
    "_id": "672345abcdef1234567890ab",
    "type": "car",
    "pickupLocation": "Mumbai Airport",
    "dropLocation": "Pune Station",
    "date": "2025-11-01",
    "time": "10:00",
    "email": "user@example.com",
    "mobile": "9876543210",
    "status": "pending",
    "syncedToSheet": true,
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:00:00.000Z"
  }
}
```

**Response** (Error):
```json
{
  "success": false,
  "message": "All required fields must be filled (mobile number is mandatory)"
}
```

---

### 2. Get All Bookings

**Endpoint**: `GET /bookings`

**Description**: Get all bookings (public view)

**Response**:
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "672345abcdef1234567890ab",
      "type": "car",
      "pickupLocation": "Mumbai Airport",
      "dropLocation": "Pune Station",
      "date": "2025-11-01",
      "time": "10:00",
      "email": "user@example.com",
      "mobile": "9876543210",
      "status": "pending",
      "createdAt": "2025-10-30T10:00:00.000Z",
      "updatedAt": "2025-10-30T10:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Booking by ID

**Endpoint**: `GET /bookings/:id`

**Description**: Get a specific booking by ID

**Response**:
```json
{
  "success": true,
  "booking": {
    "_id": "672345abcdef1234567890ab",
    "type": "car",
    "pickupLocation": "Mumbai Airport",
    "dropLocation": "Pune Station",
    "date": "2025-11-01",
    "time": "10:00",
    "email": "user@example.com",
    "mobile": "9876543210",
    "status": "pending",
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:00:00.000Z"
  }
}
```

---

## 🔐 Admin Endpoints

### 1. Admin Login

**Endpoint**: `POST /admin/login`

**Description**: Authenticate admin user and receive JWT token

**Request Body**:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response** (Success):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "role": "superadmin",
  "message": "Login successful"
}
```

**Response** (Error):
```json
{
  "success": false,
  "message": "Invalid username or password"
}
```

---

### 2. Admin Logout

**Endpoint**: `POST /admin/logout`

**Description**: Logout admin (client-side token removal)

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 3. Verify Token

**Endpoint**: `GET /admin/verify`

**Description**: Verify if JWT token is valid

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response** (Success):
```json
{
  "success": true,
  "admin": {
    "username": "admin",
    "role": "superadmin"
  }
}
```

**Response** (Error):
```json
{
  "success": false,
  "message": "Invalid token."
}
```

---

### 4. Get All Bookings (Admin)

**Endpoint**: `GET /admin/bookings`

**Description**: Get all bookings (protected route)

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response**:
```json
{
  "success": true,
  "bookings": [
    {
      "_id": "672345abcdef1234567890ab",
      "type": "car",
      "pickupLocation": "Mumbai Airport",
      "dropLocation": "Pune Station",
      "date": "2025-11-01",
      "time": "10:00",
      "email": "user@example.com",
      "mobile": "9876543210",
      "status": "pending",
      "syncedToSheet": true,
      "createdAt": "2025-10-30T10:00:00.000Z",
      "updatedAt": "2025-10-30T10:00:00.000Z"
    }
  ]
}
```

---

### 5. Confirm Booking

**Endpoint**: `PUT /admin/bookings/:id/confirm`

**Description**: Confirm a booking and send SMS to customer

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Booking confirmed and SMS sent to customer",
  "booking": {
    "_id": "672345abcdef1234567890ab",
    "type": "car",
    "pickupLocation": "Mumbai Airport",
    "dropLocation": "Pune Station",
    "date": "2025-11-01",
    "time": "10:00",
    "email": "user@example.com",
    "mobile": "9876543210",
    "status": "confirmed",
    "syncedToSheet": true,
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:15:00.000Z"
  }
}
```

**Response** (Error):
```json
{
  "success": false,
  "message": "Booking not found"
}
```

---

### 6. Delete Booking

**Endpoint**: `DELETE /admin/bookings/:id`

**Description**: Delete a booking

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Booking deleted",
  "booking": {
    "_id": "672345abcdef1234567890ab",
    "type": "car",
    "pickupLocation": "Mumbai Airport",
    "dropLocation": "Pune Station",
    "date": "2025-11-01",
    "time": "10:00",
    "email": "user@example.com",
    "mobile": "9876543210",
    "status": "pending",
    "createdAt": "2025-10-30T10:00:00.000Z",
    "updatedAt": "2025-10-30T10:00:00.000Z"
  }
}
```

---

### 7. Sync to Google Sheets

**Endpoint**: `POST /admin/sync-sheets`

**Description**: Manually sync all bookings to Google Sheets

**Headers**:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Successfully synced 15 bookings to Google Sheets"
}
```

**Response** (Not Configured):
```json
{
  "success": false,
  "message": "Failed to sync bookings. Check Google Sheets configuration."
}
```

---

## 🔍 Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📊 Data Models

### Booking Model

```javascript
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  type: String,               // "car" or "bus"
  pickupLocation: String,
  dropLocation: String,
  date: String,               // Format: YYYY-MM-DD
  time: String,               // Format: HH:MM
  email: String | null,       // Optional
  mobile: String,             // 10-digit number
  status: String,             // "pending", "confirmed", or "cancelled"
  syncedToSheet: Boolean,     // Google Sheets sync status
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-updated
}
```

### Admin Model

```javascript
{
  _id: ObjectId,
  username: String,           // Unique
  password: String,           // Hashed with bcrypt
  email: String,
  role: String,               // "admin" or "superadmin"
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 JWT Token Structure

**Payload**:
```json
{
  "id": "672345abcdef1234567890ab",
  "username": "admin",
  "role": "superadmin",
  "iat": 1698654321,
  "exp": 1698740721
}
```

**Token Expiry**: 24 hours

---

## 📱 SMS Notifications

SMS notifications are currently logged to the console. To implement real SMS:

1. Integrate with SMS gateway (Twilio, MSG91, etc.)
2. Update `sendSMS` function in:
   - `backend/routes/bookingRoutes.js`
   - `backend/routes/adminRoutes.js`

**Current SMS Messages**:

- **On Booking Creation**:
  ```
  Dear Customer, your [car/bus] booking from [pickup] to [drop] 
  on [date] at [time] has been received. 
  Booking ID: [id]. Thank you for choosing BOSSCARS!
  ```

- **On Booking Confirmation**:
  ```
  Dear Customer, your [car/bus] booking (ID: [id]) from [pickup] 
  to [drop] on [date] at [time] has been CONFIRMED! 
  Thank you for choosing BOSSCARS!
  ```

---

## 🧪 Testing with cURL

### Create Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "type": "car",
    "pickupLocation": "Mumbai",
    "dropLocation": "Pune",
    "date": "2025-11-01",
    "time": "10:00",
    "mobile": "9876543210"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Get Bookings (Admin)
```bash
curl -X GET http://localhost:5000/api/admin/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🌐 CORS Configuration

Currently configured for local development:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

For production, update CORS settings in `backend/server.js`.

---

## 📚 Additional Resources

- [JWT Documentation](https://jwt.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Express.js Guide](https://expressjs.com/)

---

Happy Coding! 🚀
