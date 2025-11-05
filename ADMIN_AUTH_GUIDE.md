# 🔐 Admin Authentication System - Complete Guide

## Overview
The admin panel is now protected with login authentication. Only authorized users can access the booking dashboard.

## 🔑 Login Credentials

### Default Admin Account:
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **Important**: Change these credentials in production! These are demo credentials for testing.

## 🎯 How It Works

### 1. Login Flow
```
User visits /admin
    ↓
Enters username & password
    ↓
Backend validates credentials
    ↓
Token generated & stored in localStorage
    ↓
User redirected to /admin/dashboard
    ↓
Dashboard loads with authentication check
```

### 2. Protected Routes
All admin routes now require authentication:
- `GET /api/admin/bookings` - View bookings
- `PUT /api/admin/bookings/:id/confirm` - Confirm booking
- `DELETE /api/admin/bookings/:id` - Delete booking

### 3. Session Management
- Token stored in browser's localStorage
- Token validated on every API request
- Auto-logout on invalid/expired token
- Manual logout clears token

## 📁 Files Changed

### Frontend:
1. **`frontend/src/pages/AdminLogin.jsx`** (NEW)
   - Login form with username/password
   - Credentials validation
   - Error handling
   - Token storage

2. **`frontend/src/pages/AdminDashboard.jsx`** (NEW)
   - Protected dashboard component
   - Authentication check on load
   - Logout functionality
   - Shows admin username
   - All booking management features

3. **`frontend/src/App.jsx`** (UPDATED)
   - New routes:
     - `/admin` → Login page
     - `/admin/dashboard` → Protected dashboard

### Backend:
1. **`backend/routes/adminRoutes.js`** (UPDATED)
   - `POST /api/admin/login` - Login endpoint
   - `POST /api/admin/logout` - Logout endpoint
   - `authenticateAdmin` middleware - Token validation
   - Protected booking routes

## 🚀 How to Use

### For Testing:
1. **Restart Backend Server** (Important!):
   ```bash
   # Stop the current backend (press Ctrl+C in backend terminal)
   cd backend
   npm start
   ```

2. **Access Admin Panel**:
   - Go to: http://localhost:5173/admin
   - You'll see the login page

3. **Login**:
   - Username: `admin`
   - Password: `admin123`
   - Click "Login"

4. **Dashboard**:
   - After successful login, you're redirected to dashboard
   - See your username at the top
   - Logout button in the header

5. **Logout**:
   - Click "🚪 Logout" button
   - Redirected back to login page
   - Token cleared from storage

### Security Features:
- ✅ Login required to access bookings
- ✅ Token-based authentication
- ✅ Auto-redirect to login if not authenticated
- ✅ Logout clears session
- ✅ All admin API routes protected
- ✅ Unauthorized access returns 401 error

## 🔒 Security Implementation

### Current (Development):
```javascript
// Simple token generation
const token = `token_${Date.now()}_${Math.random()}`;

// Simple password check
if (username === 'admin' && password === 'admin123') {
  // Grant access
}
```

### Production Recommendations:
```javascript
// 1. Use JWT (JSON Web Tokens)
import jwt from 'jsonwebtoken';
const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' });

// 2. Hash passwords with bcrypt
import bcrypt from 'bcrypt';
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(inputPassword, hashedPassword);

// 3. Store users in database
const user = await db.users.findOne({ username });

// 4. Add HTTPS
// 5. Add rate limiting
// 6. Add CSRF protection
// 7. Add session expiry
```

## 📋 API Endpoints

### Authentication:
```
POST /api/admin/login
Body: { username, password }
Response: { success, token, username, message }

POST /api/admin/logout
Headers: Authorization: Bearer <token>
Response: { success, message }
```

### Protected Routes:
```
GET /api/admin/bookings
Headers: Authorization: Bearer <token>
Response: { success, bookings }

PUT /api/admin/bookings/:id/confirm
Headers: Authorization: Bearer <token>
Response: { success, message, booking }

DELETE /api/admin/bookings/:id
Headers: Authorization: Bearer <token>
Response: { success, message, booking }
```

## 🎨 UI Features

### Login Page:
- Clean, centered design
- Username and password fields
- Error message display
- Loading state during login
- "Back to Home" button
- Demo credentials displayed for easy access

### Dashboard Header:
- Shows "Welcome, [username]"
- Logout button with emoji
- Consistent with overall design

### Auto-Redirect:
- Accessing `/admin/dashboard` without login → redirected to `/admin`
- After logout → redirected to `/admin`
- After login → redirected to `/admin/dashboard`

## 🧪 Testing Checklist

### Test Login:
- ✅ Visit `/admin`
- ✅ Try wrong credentials (should show error)
- ✅ Try correct credentials (should login)
- ✅ Check token in localStorage (F12 → Application → Local Storage)

### Test Dashboard Access:
- ✅ Try accessing `/admin/dashboard` directly (should redirect to login)
- ✅ Login and verify redirect to dashboard
- ✅ Check username displays in header
- ✅ Verify all booking features work

### Test Logout:
- ✅ Click logout button
- ✅ Verify redirect to login page
- ✅ Check token removed from localStorage
- ✅ Try accessing dashboard (should redirect to login)

### Test API Protection:
- ✅ Try API call without token (should get 401)
- ✅ Try API call with invalid token (should get 401)
- ✅ Try API call with valid token (should work)

## 🔧 Customization

### Change Admin Credentials:
Edit `backend/routes/adminRoutes.js`:
```javascript
const ADMIN_CREDENTIALS = {
  username: 'yourusername',
  password: 'yourpassword'
};
```

### Add Multiple Admins:
```javascript
const ADMIN_CREDENTIALS = [
  { username: 'admin1', password: 'pass1' },
  { username: 'admin2', password: 'pass2' }
];

// In login route:
const admin = ADMIN_CREDENTIALS.find(a => 
  a.username === username && a.password === password
);
```

### Add Token Expiry:
```javascript
const tokens = new Map(); // Store tokens with expiry

// Store with timestamp
tokens.set(token, {
  username,
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
});

// Validate with expiry check
const tokenData = tokens.get(token);
if (!tokenData || tokenData.expiresAt < Date.now()) {
  return res.status(401).json({ success: false, message: 'Token expired' });
}
```

## 🚨 Troubleshooting

### "Unauthorized" Error:
- Check if backend is running
- Clear localStorage and login again
- Verify token is being sent in requests

### Can't Login:
- Check credentials (username: admin, password: admin123)
- Check backend console for errors
- Verify backend is on port 5000

### Auto-Logout:
- Normal if token is invalid
- Normal after backend restart (tokens cleared)
- Normal after manual logout

### Backend Not Starting:
- Port 5000 may be in use
- Kill existing process: `npx kill-port 5000`
- Or use different port

## 📊 Backend Console Output

### Successful Login:
```
✅ Admin login successful: admin
```

### Failed Login:
```
❌ Failed login attempt: wronguser
```

### Protected Route Access:
```
📱 SMS Sent to 9876543210:
Dear Customer, your car booking...
```

## 🎯 Next Steps

### Immediate:
1. ✅ Restart backend server
2. ✅ Test login flow
3. ✅ Verify all features work

### Future Enhancements:
1. Implement JWT tokens
2. Add password hashing (bcrypt)
3. Store admins in database
4. Add "Forgot Password" feature
5. Add "Change Password" feature
6. Add user roles (admin, moderator, viewer)
7. Add login history/audit log
8. Add session timeout
9. Add "Remember Me" feature
10. Add 2FA (Two-Factor Authentication)

## 🔐 Production Security Checklist

Before deploying to production:
- [ ] Change default credentials
- [ ] Use JWT instead of simple tokens
- [ ] Hash passwords with bcrypt
- [ ] Store users in database
- [ ] Enable HTTPS
- [ ] Add rate limiting (prevent brute force)
- [ ] Add CORS restrictions
- [ ] Add input validation
- [ ] Add SQL injection protection
- [ ] Add XSS protection
- [ ] Add session expiry
- [ ] Add logging and monitoring
- [ ] Add backup admin account
- [ ] Document admin procedures

---

## ✅ Summary

**Status**: Authentication system fully implemented!

**Features**:
- ✅ Login page with credentials
- ✅ Token-based authentication
- ✅ Protected admin dashboard
- ✅ Logout functionality
- ✅ Auto-redirect for unauthorized access
- ✅ All API routes protected
- ✅ Error handling
- ✅ User-friendly UI

**Default Login**:
- Username: `admin`
- Password: `admin123`

**Access**: http://localhost:5173/admin

**Ready to Use!** 🚀

---

**Need Help?** Check the troubleshooting section or test with the provided credentials.
