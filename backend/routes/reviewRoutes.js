import express from 'express';
import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import googleSheetsService from '../services/googleSheets.js';

const router = express.Router();

// Submit a new review (Public endpoint)
router.post('/', async (req, res) => {
  try {
    const { customerName, bookingId, rating, comment } = req.body;

    // Validate booking ID exists and is confirmed
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found. Please provide a valid booking ID.' 
      });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Reviews can only be submitted for confirmed bookings.' 
      });
    }

    // Check if customer already reviewed this booking
    const existingReview = await Review.findOne({ bookingId });
    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already submitted a review for this booking.' 
      });
    }

    // Verify customer name matches booking (with safety checks)
    let nameMatch = false;
    if (booking.name && customerName) {
      const bookingNameLower = booking.name.toLowerCase();
      const customerNameLower = customerName.toLowerCase();
      nameMatch = bookingNameLower.includes(customerNameLower) || 
                  customerNameLower.includes(bookingNameLower);
    }
    
    // Create review
    const review = new Review({
      customerName,
      bookingId,
      rating: parseInt(rating),
      comment,
      verified: nameMatch, // Auto-verify if name matches
      tripDate: new Date(booking.date),
      serviceType: booking.type
    });

    await review.save();

    // Sync to Google Sheets
    try {
      await googleSheetsService.addReview(review);
      review.syncedToSheet = true;
      await review.save();
    } catch (sheetError) {
      console.error('Failed to sync review to Google Sheets:', sheetError);
      // Don't fail the request if sheets sync fails
    }

    // Populate booking reference for response
    await review.populate('bookingId', 'name type date');

    res.status(201).json({
      success: true,
      message: nameMatch 
        ? 'Review submitted and verified successfully!' 
        : 'Review submitted! It will be verified by our team.',
      review
    });

  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit review', 
      error: error.message 
    });
  }
});

// Get all approved reviews (Public endpoint)
router.get('/', async (req, res) => {
  try {
    const { limit = 50, verified = 'true' } = req.query;
    
    const query = { isApproved: true };
    if (verified === 'true') {
      query.verified = true;
    }

    const reviews = await Review.find(query)
      .populate('bookingId', 'type date')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const stats = await Review.getAverageRating();
    const distribution = await Review.getRatingDistribution();

    res.json({
      success: true,
      reviews,
      stats: {
        averageRating: stats.avgRating ? stats.avgRating.toFixed(1) : 0,
        totalReviews: stats.totalReviews,
        distribution
      }
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch reviews', 
      error: error.message 
    });
  }
});

// Get review statistics (Public endpoint)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Review.getAverageRating();
    const distribution = await Review.getRatingDistribution();

    res.json({
      success: true,
      stats: {
        averageRating: stats.avgRating ? stats.avgRating.toFixed(1) : 0,
        totalReviews: stats.totalReviews,
        distribution
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch statistics', 
      error: error.message 
    });
  }
});

export default router;
