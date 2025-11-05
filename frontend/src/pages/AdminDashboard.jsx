import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'reviews'
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUser');
    
    if (!token) {
      navigate('/admin');
      return;
    }
    
    setAdminUser(username);
    fetchBookings();
    fetchReviews();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings);
      } else if (data.message === 'Unauthorized') {
        handleLogout();
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews);
        setReviewStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const confirmBooking = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/bookings/${id}/confirm`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchBookings();
        alert('✅ Booking confirmed! SMS sent to customer.');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/bookings/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          fetchBookings();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const syncToGoogleSheets = async () => {
    if (window.confirm('Sync all bookings to Google Sheets?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/sync-sheets`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          alert('✅ ' + data.message);
        } else {
          alert('❌ Failed to sync to Google Sheets');
        }
      } catch (error) {
        console.error('Error syncing to Google Sheets:', error);
        alert('❌ Error syncing to Google Sheets');
      }
    }
  };

  const syncReviewsToGoogleSheets = async () => {
    if (window.confirm('Sync all verified reviews to Google Sheets?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/sync-reviews`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          alert('✅ ' + data.message);
        } else {
          alert('❌ Failed to sync reviews to Google Sheets');
        }
      } catch (error) {
        console.error('Error syncing reviews:', error);
        alert('❌ Error syncing reviews to Google Sheets');
      }
    }
  };

  const verifyReview = async (id) => {
    if (window.confirm('Verify this review?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/reviews/${id}/verify`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          fetchReviews();
          alert('✅ Review verified successfully!');
        }
      } catch (error) {
        console.error('Error verifying review:', error);
      }
    }
  };

  const deleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/reviews/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          fetchReviews();
          alert('✅ Review deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(`${dateStr}T${timeStr}`);
    return {
      date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      full: date
    };
  };

  const formatCreatedAt = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortedAndFilteredBookings = () => {
    let filtered = [...bookings];

    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.dropLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.mobile.includes(searchQuery) ||
        (b.email && b.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b._id && b._id.toString().includes(searchQuery))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA - dateB;
        case 'time':
          return a.time.localeCompare(b.time);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const sortedBookings = getSortedAndFilteredBookings();
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-md"
      >
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">BossCars Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {adminUser}</p>
          </div>
          <div className="flex gap-3">
            {activeTab === 'bookings' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={syncToGoogleSheets}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                📊 Sync Bookings
              </motion.button>
            )}
            {activeTab === 'reviews' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={syncReviewsToGoogleSheets}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                ⭐ Sync Reviews
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              🚪 Logout
            </motion.button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'bookings'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'reviews'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ⭐ Reviews ({reviews.length})
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, mobile, ID..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="date">Booking Date & Time</option>
                <option value="createdAt">Created Date (Newest First)</option>
                <option value="status">Status</option>
                <option value="time">Time Only</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending Only</option>
                <option value="confirmed">Confirmed Only</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Bookings ({sortedBookings.length})
          </h2>

          {loading ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading bookings...</p>
            </div>
          ) : sortedBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-12 text-center"
            >
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {searchQuery || filterStatus !== 'all' ? 'No Matching Bookings' : 'No Bookings Yet'}
              </h3>
              <p className="text-gray-600">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your filters or search query' 
                  : 'New bookings will appear here'}
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {sortedBookings.map((booking, index) => {
                const { date, time } = formatDateTime(booking.date, booking.time);
                
                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">
                            {booking.type === 'car' ? '🚗' : '🚌'}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-gray-800">
                                Booking #{booking._id.substring(booking._id.length - 8)}
                              </h3>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              Created: {formatCreatedAt(booking.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {booking.status !== 'confirmed' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => confirmBooking(booking._id)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center gap-2"
                            >
                              <span>✓</span>
                              <span>Confirm & Send SMS</span>
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteBooking(booking._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                          >
                            ✗ Delete
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-sm text-gray-500 mb-1">Customer Name</p>
                          <p className="flex items-center text-gray-700">
                            <span className="text-primary mr-2">👤</span>
                            <span className="font-medium">{booking.name || 'N/A'}</span>
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-sm text-gray-500 mb-1">Route</p>
                          <p className="flex items-center text-gray-700">
                            <span className="text-primary mr-2">📍</span>
                            <span className="font-medium">{booking.pickupLocation}</span>
                          </p>
                          <p className="flex items-center text-gray-700 mt-1">
                            <span className="text-red-500 mr-2">📍</span>
                            <span className="font-medium">{booking.dropLocation}</span>
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-sm text-gray-500 mb-1">Date & Time</p>
                          <p className="flex items-center text-gray-700">
                            <span className="text-primary mr-2">📅</span>
                            <span className="font-medium">{date}</span>
                          </p>
                          <p className="flex items-center text-gray-700 mt-1">
                            <span className="text-primary mr-2">🕐</span>
                            <span className="font-medium">{time}</span>
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-sm text-gray-500 mb-1">Mobile</p>
                          <p className="flex items-center text-gray-700">
                            <span className="text-primary mr-2">📞</span>
                            <span className="font-medium">{booking.mobile}</span>
                          </p>
                          {booking.email && (
                            <>
                              <p className="font-semibold text-sm text-gray-500 mb-1 mt-2">Email</p>
                              <p className="flex items-center text-gray-700">
                                <span className="text-primary mr-2">📧</span>
                                <span className="font-medium text-sm">{booking.email}</span>
                              </p>
                            </>
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-semibold text-sm text-gray-500 mb-1">Vehicle Type</p>
                          <p className="flex items-center text-gray-700">
                            <span className="font-medium capitalize">{booking.type}</span>
                          </p>
                          {booking.carType && (
                            <>
                              <p className="font-semibold text-sm text-gray-500 mb-1 mt-2">Car Type</p>
                              <p className="text-sm text-primary font-semibold capitalize">
                                {booking.carType.replace('-', ' ')}
                                {booking.carType === 'sedan' && ' (₹13/km)'}
                                {booking.carType === 'suv' && ' (₹19/km)'}
                                {booking.carType === 'innova-crysta' && ' (₹20/km)'}
                              </p>
                            </>
                          )}
                          {booking.confirmedAt && (
                            <>
                              <p className="font-semibold text-sm text-gray-500 mb-1 mt-2">Confirmed At</p>
                              <p className="text-sm text-green-600 font-medium">
                                {formatCreatedAt(booking.confirmedAt)}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
          </>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <>
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Average Rating</p>
                    <p className="text-3xl font-bold text-orange-500">{reviewStats.averageRating}/5.0</p>
                  </div>
                  <div className="text-4xl">⭐</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold">Total Reviews</p>
                    <p className="text-3xl font-bold text-gray-800">{reviewStats.totalReviews}</p>
                  </div>
                  <div className="text-4xl">💬</div>
                </div>
              </motion.div>
            </div>

            {/* Reviews List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Reviews ({reviews.length})
              </h2>

              {loading ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600">Customer reviews will appear here once submitted</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{review.customerName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                  ⭐
                                </span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({review.rating}/5)</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {review.verified ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                              <span>✅</span> Verified
                            </span>
                          ) : (
                            <button
                              onClick={() => verifyReview(review._id)}
                              className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-semibold"
                            >
                              Verify
                            </button>
                          )}
                          
                          <button
                            onClick={() => deleteReview(review._id)}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 font-semibold">Booking ID</p>
                          <p className="text-gray-700 font-mono text-xs truncate">
                            {review.bookingId?._id || review.bookingId}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-semibold">Service Type</p>
                          <p className="text-gray-700 capitalize">
                            {review.serviceType || review.bookingId?.type || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-semibold">Trip Date</p>
                          <p className="text-gray-700">
                            {review.tripDate ? new Date(review.tripDate).toLocaleDateString('en-IN') : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 font-semibold">Submitted</p>
                          <p className="text-gray-700">
                            {formatCreatedAt(review.createdAt)}
                          </p>
                        </div>
                      </div>

                      {review.verifiedAt && (
                        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                          Verified on {formatCreatedAt(review.verifiedAt)} 
                          {review.verifiedBy?.username && ` by ${review.verifiedBy.username}`}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
