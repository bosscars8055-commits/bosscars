import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config/api';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    bookingId: '',
    rating: 0,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      setMessage({ type: 'error', text: 'Please select a rating' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ 
          type: 'success', 
          text: data.message || 'Review submitted successfully! Thank you for your feedback.' 
        });
        
        // Reset form
        setFormData({
          customerName: '',
          bookingId: '',
          rating: 0,
          comment: ''
        });

        // Scroll to reviews section after 2 seconds
        setTimeout(() => {
          const reviewsSection = document.getElementById('reviews');
          if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Failed to submit review. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage({ 
        type: 'error', 
        text: 'Unable to connect to server. Please try again later.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="review-form" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">
              Share Your <span className="text-orange-500">Experience</span>
            </h2>
            <p className="text-gray-600">
              Your feedback helps us improve and helps others make informed decisions
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={100}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Booking ID Input */}
              <div>
                <label htmlFor="bookingId" className="block text-sm font-medium text-gray-700 mb-2">
                  Booking ID *
                </label>
                <input
                  type="text"
                  id="bookingId"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
                  placeholder="Enter your booking ID for verification"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Your booking ID can be found in your booking confirmation
                </p>
              </div>

              {/* Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoveredRating || formData.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                {formData.rating > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    {formData.rating === 5 && '⭐ Excellent!'}
                    {formData.rating === 4 && '😊 Very Good!'}
                    {formData.rating === 3 && '👍 Good'}
                    {formData.rating === 2 && '😐 Fair'}
                    {formData.rating === 1 && '😞 Needs Improvement'}
                  </p>
                )}
              </div>

              {/* Comment Input */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Share your experience with us... (minimum 10 characters)"
                ></textarea>
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-gray-500">
                    Minimum 10 characters
                  </p>
                  <p className="text-sm text-gray-500">
                    {formData.comment.length}/1000
                  </p>
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 p-4 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                🔒 Your review will be verified with your booking details and displayed publicly
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
