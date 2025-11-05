import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must not exceed 100 characters']
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking ID is required for verification'],
    index: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not exceed 5'],
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number'
    }
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [1000, 'Comment must not exceed 1000 characters']
  },
  verified: {
    type: Boolean,
    default: false,
    index: true
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  },
  tripDate: {
    type: Date,
    default: null
  },
  serviceType: {
    type: String,
    enum: ['car', 'bus'],
    default: null
  },
  isApproved: {
    type: Boolean,
    default: true // Auto-approve for now, can be changed to false for manual moderation
  },
  syncedToSheet: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for efficient querying
reviewSchema.index({ verified: 1, isApproved: 1, createdAt: -1 });

// Method to verify review
reviewSchema.methods.verify = async function(adminId) {
  this.verified = true;
  this.verifiedBy = adminId;
  this.verifiedAt = new Date();
  return this.save();
};

// Static method to get average rating
reviewSchema.statics.getAverageRating = async function() {
  const result = await this.aggregate([
    { $match: { verified: true, isApproved: true } },
    { $group: {
      _id: null,
      avgRating: { $avg: '$rating' },
      totalReviews: { $sum: 1 }
    }}
  ]);
  
  return result.length > 0 ? result[0] : { avgRating: 0, totalReviews: 0 };
};

// Static method to get rating distribution
reviewSchema.statics.getRatingDistribution = async function() {
  const result = await this.aggregate([
    { $match: { verified: true, isApproved: true } },
    { $group: {
      _id: '$rating',
      count: { $sum: 1 }
    }},
    { $sort: { _id: -1 } }
  ]);
  
  return result;
};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
