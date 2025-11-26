import express from 'express';
import Admin from '../models/Admin.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    // Try to find admin in database
    let admin = await Admin.findOne({ username });

    // If admin doesn't exist, create one from environment variables
    // This happens on first run
    if (!admin && username === process.env.ADMIN_USERNAME) {
      admin = new Admin({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
      });
      await admin.save();
    }

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Login successful',
      admin: {
        id: admin._id,
        username: admin.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed. Please try again.' 
    });
  }
});

// Get all bookings (admin only)
router.get('/bookings', async (req, res) => {
  try {
    // In production, you should implement proper authentication middleware
    // For now, this endpoint is accessible but should be protected
    
    const bookings = await Booking.find()
      .sort({ createdAt: -1 }) // Most recent first
      .select('-__v'); // Exclude version key

    res.json({ 
      success: true, 
      count: bookings.length,
      bookings 
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch bookings' 
    });
  }
});

export default router;
