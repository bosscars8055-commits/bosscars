import express from 'express';
import Booking from '../models/Booking.js';
import { saveBookingToWord } from '../utils/wordGenerator.js';

const router = express.Router();

// Create new booking
router.post('/book', async (req, res) => {
  try {
    const { name, mobile, email, pickupLocation, dropoffLocation, vehicle } = req.body;

    // Validate required fields
    if (!name || !mobile || !email || !pickupLocation || !dropoffLocation || !vehicle) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate Indian mobile number (10 digits starting with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid mobile number. Please enter a valid 10-digit Indian mobile number' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Validate vehicle selection
    const validVehicles = ['Honda City', 'Sedan', 'SUV', 'Innova Crysta', 'Executive Bus', 'Travel Bus'];
    if (!validVehicles.includes(vehicle)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid vehicle selection' 
      });
    }

    // Create new booking
    const booking = new Booking({
      name,
      mobile,
      email,
      pickupLocation,
      dropoffLocation,
      vehicle
    });

    // Save to MongoDB
    await booking.save();
    console.log('✅ Booking saved to MongoDB:', booking._id);

    // Save to Word document
    await saveBookingToWord(booking);

    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully!',
      booking: {
        id: booking._id,
        name: booking.name,
        vehicle: booking.vehicle,
        createdAt: booking.createdAt
      }
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking. Please try again.' 
    });
  }
});

export default router;
