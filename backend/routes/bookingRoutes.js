import express from 'express';
import Booking from '../models/Booking.js';
import googleSheetsService from '../services/googleSheets.js';

const router = express.Router();

// Simulate SMS sending
const sendSMS = (mobile, booking) => {
  console.log(`\n📱 SMS Sent to ${mobile}:`);
  console.log(`Dear Customer, your ${booking.type} booking from ${booking.pickupLocation} to ${booking.dropLocation} on ${booking.date} at ${booking.time} has been received. Booking ID: ${booking._id}. Thank you for choosing BossCars!`);
  return true;
};

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
});

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { name, type, carType, pickupLocation, dropLocation, date, time, email, mobile } = req.body;

    // Validation - only mobile is required, email is optional
    if (!type || !pickupLocation || !dropLocation || !date || !time || !mobile) {
      return res.status(400).json({ 
        success: false, 
        message: 'All required fields must be filled (mobile number is mandatory)' 
      });
    }

    // Validate mobile number format
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid 10-digit mobile number' 
      });
    }

    // Create new booking in MongoDB
    const newBooking = new Booking({
      name: name || 'Guest',
      type,
      carType: carType || null,
      pickupLocation,
      dropLocation,
      date,
      time,
      email: email || null,
      mobile,
      status: 'pending'
    });

    await newBooking.save();
    
    // Send SMS notification
    sendSMS(mobile, newBooking);
    
    // Sync to Google Sheets
    const synced = await googleSheetsService.addBooking(newBooking);
    if (synced) {
      newBooking.syncedToSheet = true;
      await newBooking.save();
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully! SMS confirmation sent to your mobile.', 
      booking: newBooking 
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create booking. Please try again.' 
    });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch booking' });
  }
});

export default router;
