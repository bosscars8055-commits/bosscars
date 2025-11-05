import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
    default: 'Guest'
  },
  type: {
    type: String,
    required: true,
    enum: ['car', 'bus']
  },
  carType: {
    type: String,
    enum: ['sedan', 'suv', 'innova-crysta'],
    default: null
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropLocation: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: 'Please provide a valid 10-digit mobile number'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  syncedToSheet: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
