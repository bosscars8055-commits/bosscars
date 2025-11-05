# BOSSCARS - Complete Setup Guide

## 🚀 Quick Start (All Features)

This guide will help you set up BOSSCARS with MongoDB database, JWT authentication, and Google Sheets integration.

---

## 📋 Prerequisites

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local**: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - **Cloud**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
3. **Google Cloud Account** (for Google Sheets integration) - [Google Cloud Console](https://console.cloud.google.com)

---

## 🗄️ Part 1: MongoDB Setup

### Option A: Local MongoDB Installation

1. **Install MongoDB Community Server**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation wizard for your OS
   - Default port: 27017

2. **Start MongoDB Service**
   - **Windows**: MongoDB starts automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. **Verify Installation**
   ```bash
   mongosh
   # You should see MongoDB shell connected
   ```

4. **Your Connection String**: `mongodb://localhost:27017/bosscars`

### Option B: MongoDB Atlas (Cloud - Recommended)

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create a Cluster**
   - Choose "Shared" (Free tier)
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set "Database User Privileges" to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Replace database name if needed

6. **Your Connection String Example**:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.abc123.mongodb.net/bosscars?retryWrites=true&w=majority
   ```

---

## 📊 Part 2: Google Sheets Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (e.g., "BOSSCARS")
3. Wait for project creation to complete

### Step 2: Enable Google Sheets API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

### Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in details:
   - Name: `bosscars-sheets-service`
   - Description: `Service account for BOSSCARS booking sync`
4. Click **Create and Continue**
5. Skip optional steps, click **Done**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** format
5. Click **Create** (a JSON file will download)

### Step 5: Extract Credentials from JSON

Open the downloaded JSON file. You need two values:
- `client_email`: Something like `bosscars-sheets-service@project-id.iam.gserviceaccount.com`
- `private_key`: A long string starting with `-----BEGIN PRIVATE KEY-----`

### Step 6: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "BOSSCARS Bookings"
4. Copy the spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

### Step 7: Share Sheet with Service Account

1. In your Google Sheet, click **Share** button
2. Paste the `client_email` from your JSON file
3. Give it **Editor** access
4. Uncheck "Notify people"
5. Click **Share**

---

## ⚙️ Part 3: Backend Configuration

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Edit `backend/.env` file:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
# Use your connection string from Part 1
MONGODB_URI=mongodb://localhost:27017/bosscars
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bosscars

# JWT Secret (Generate a random string for security)
JWT_SECRET=your_very_long_and_random_secret_key_here_min_32_characters

# Admin Credentials (First-time setup)
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123

# Google Sheets Configuration (from Part 2)
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
```

**Important Notes:**
- **JWT_SECRET**: Generate a secure random string (use: https://randomkeygen.com/)
- **PRIVATE_KEY**: Keep the quotes and `\n` characters as-is
- **MongoDB URI**: Don't forget to replace `<password>` with actual password

### Step 3: Start Backend Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: localhost (or your Atlas cluster)
📊 Database: bosscars
✅ Default admin user created
   Username: admin
   Password: admin123
   ⚠️  Please change the password after first login!
✅ Google Sheets: Configured successfully
Server is running on http://localhost:5000
```

---

## 🎨 Part 4: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

## 🔐 Part 5: Testing Everything

### 1. Test Admin Login

1. Go to: http://localhost:5173/admin
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. You should see the admin dashboard

### 2. Test Booking Creation

1. Go to home page: http://localhost:5173
2. Scroll to "Book Your Ride"
3. Fill in the form and submit
4. Check admin dashboard for the new booking

### 3. Test Google Sheets Sync

1. In admin dashboard, click **"Sync to Sheets"** button
2. Check your Google Sheet - bookings should appear!

### 4. Test Booking Confirmation

1. Click **"Confirm & Send SMS"** on a booking
2. Check backend terminal - you should see SMS log
3. Booking status changes to "Confirmed"
4. Google Sheet updates automatically

---

## 🛠️ Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: bad auth`
- **Fix**: Check username/password in connection string
- Ensure database user has proper permissions in MongoDB Atlas

**Error**: `Connection refused`
- **Fix**: Ensure MongoDB service is running
- For local: Start MongoDB service
- For Atlas: Check network access settings

### Google Sheets Issues

**Error**: "Google Sheets not configured"
- **Fix**: Check all three values in `.env` are correct
- Ensure service account email is shared with the spreadsheet

**Error**: "Permission denied"
- **Fix**: Share the Google Sheet with service account email
- Give "Editor" permissions

### JWT/Auth Issues

**Error**: "Invalid token"
- **Fix**: Logout and login again
- Check JWT_SECRET is set in `.env`

---

## 📁 Project Structure

```
BOSSCARS/
├── backend/
│   ├── .env                    # Environment variables
│   ├── server.js              # Main server file
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/
│   │   ├── Admin.js           # Admin user model
│   │   └── Booking.js         # Booking model
│   ├── routes/
│   │   ├── adminRoutes.js     # Admin endpoints
│   │   └── bookingRoutes.js   # Booking endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   └── services/
│       └── googleSheets.js    # Google Sheets integration
└── frontend/
    └── src/
        └── pages/
            ├── AdminLogin.jsx      # Login page
            └── AdminDashboard.jsx  # Admin panel
```

---

## 🔒 Security Best Practices

1. **Change Default Admin Password**
   - Login with default credentials
   - Create new admin user (future feature)
   - Delete default admin

2. **Secure JWT Secret**
   - Use long random string (32+ characters)
   - Never commit to Git

3. **MongoDB Security**
   - Use strong database passwords
   - Restrict IP access in production
   - Enable authentication

4. **Google Service Account**
   - Keep JSON file secure
   - Never commit to Git
   - Share sheets only with specific service account

---

## 📞 Support

If you encounter issues:
1. Check backend terminal for error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB and required services are running

---

## 🎉 Next Steps

- [ ] Test complete booking flow
- [ ] Verify Google Sheets sync
- [ ] Change default admin password
- [ ] Set up production MongoDB cluster
- [ ] Deploy application

Enjoy using BOSSCARS! 🚗🚌
