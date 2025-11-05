import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { authenticateAdmin } from '../middleware/auth.js';
import googleSheetsService from '../services/googleSheets.js';

const router = express.Router();

// Simulate SMS sending
const sendSMS = (mobile, message) => {
  console.log(`\n📱 SMS Sent to ${mobile}:`);
  console.log(message);
  return true;
};

// Admin signup endpoint (Only allows ONE admin - superadmin)
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate inputs
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, password, and name'
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if ANY admin already exists
    const existingAdminCount = await Admin.countDocuments();
    
    if (existingAdminCount > 0) {
      return res.status(403).json({
        success: false,
        message: 'Admin account already exists. Only one admin is allowed.'
      });
    }

    // Check if email already exists (extra safety)
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create the first and only admin
    const admin = new Admin({
      email: email.toLowerCase(),
      password,
      name,
      role: 'superadmin',
      isSuperAdmin: true,
      isActive: true
    });

    await admin.save();

    console.log(`\n✅ Admin account created successfully: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully! You can now login.',
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin account. Please try again.'
    });
  }
});

// Check if admin exists
router.get('/check-admin', async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    res.json({
      success: true,
      adminExists: adminCount > 0
    });
  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check admin status'
    });
  }
});

// Admin login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      console.log(`\n❌ Failed login attempt: ${email} (admin not found)`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      console.log(`\n❌ Failed login attempt: ${email} (account deactivated)`);
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      console.log(`\n❌ Failed login attempt: ${email} (wrong password)`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token (expires in 24 hours)
    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`\n✅ Admin login successful: ${email}`);

    res.json({
      success: true,
      token,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Admin logout endpoint
router.post('/logout', (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  // Optionally implement token blacklisting here
  res.json({ success: true, message: 'Logged out successfully' });
});

// Verify token endpoint
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    admin: {
      username: req.admin.username,
      role: req.admin.role
    }
  });
});

// Get all bookings for admin (protected route)
router.get('/bookings', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Confirm booking (protected route)
router.put('/bookings/:id/confirm', authenticateAdmin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = 'confirmed';
    await booking.save();

    // Send SMS notification
    const smsMessage = `Dear Customer, your ${booking.type} booking (ID: ${booking._id}) from ${booking.pickupLocation} to ${booking.dropLocation} on ${booking.date} at ${booking.time} has been CONFIRMED! Thank you for choosing BossCars!`;
    sendSMS(booking.mobile, smsMessage);

    // Update in Google Sheets
    await googleSheetsService.updateBooking(booking);

    res.json({
      success: true,
      message: 'Booking confirmed and SMS sent to customer',
      booking
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ success: false, message: 'Failed to confirm booking' });
  }
});

// Delete booking (protected route)
router.delete('/bookings/:id', authenticateAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Note: You may want to keep the record in Google Sheets for history
    // Or implement a delete operation in googleSheetsService if needed

    res.json({ success: true, message: 'Booking deleted', booking });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ success: false, message: 'Failed to delete booking' });
  }
});

// Sync all bookings to Google Sheets (protected route)
router.post('/sync-sheets', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find();
    const synced = await googleSheetsService.syncAllBookings(bookings);

    if (synced) {
      // Mark all as synced
      await Booking.updateMany({}, { syncedToSheet: true });

      res.json({
        success: true,
        message: `Successfully synced ${bookings.length} bookings to Google Sheets`
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to sync bookings. Check Google Sheets configuration.'
      });
    }
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync bookings to Google Sheets'
    });
  }
});

// Get all reviews (Admin only)
router.get('/reviews', authenticateAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('bookingId', 'name type date mobile')
      .populate('verifiedBy', 'username')
      .sort({ createdAt: -1 });

    const stats = await Review.getAverageRating();

    res.json({
      success: true,
      reviews,
      stats: {
        averageRating: stats.avgRating ? stats.avgRating.toFixed(1) : 0,
        totalReviews: stats.totalReviews
      }
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
});

// Verify a review (Admin only)
router.put('/reviews/:id/verify', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.verified) {
      return res.status(400).json({
        success: false,
        message: 'Review is already verified'
      });
    }

    await review.verify(req.admin._id);

    // Sync to Google Sheets if not already synced
    if (!review.syncedToSheet) {
      try {
        await googleSheetsService.addReview(review);
        review.syncedToSheet = true;
        await review.save();
      } catch (sheetError) {
        console.error('Failed to sync review to Google Sheets:', sheetError);
      }
    }

    await review.populate('bookingId', 'name type date mobile');
    await review.populate('verifiedBy', 'username');

    res.json({
      success: true,
      message: 'Review verified successfully',
      review
    });
  } catch (error) {
    console.error('Error verifying review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify review'
    });
  }
});

// Delete a review (Admin only)
router.delete('/reviews/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
});

// Sync reviews to Google Sheets (Admin only)
router.post('/sync-reviews', authenticateAdmin, async (req, res) => {
  try {
    console.log('\n📊 Admin initiated review sync to Google Sheets...');
    
    const syncResult = await googleSheetsService.syncAllReviews();
    
    if (syncResult.success) {
      // Mark all reviews as synced
      await Review.updateMany(
        { verified: true, isApproved: true },
        { syncedToSheet: true }
      );

      console.log(`✅ Successfully synced ${syncResult.count} reviews to Google Sheets`);
      
      res.json({
        success: true,
        message: `Successfully synced ${syncResult.count} reviews to Google Sheets`,
        count: syncResult.count
      });
    } else {
      console.error('❌ Failed to sync reviews:', syncResult.error);
      res.status(500).json({
        success: false,
        message: 'Failed to sync reviews. Check Google Sheets configuration.'
      });
    }
  } catch (error) {
    console.error('Error syncing reviews to Google Sheets:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync reviews to Google Sheets'
    });
  }
});

export default router;
