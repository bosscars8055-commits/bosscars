import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

const AdminPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // date, time, status, createdAt
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, confirmed
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/bookings`);
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/bookings/${id}/confirm`, {
        method: 'PUT'
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
        const response = await fetch(`${API_BASE_URL}/api/admin/bookings/${id}`, {
          method: 'DELETE'
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

  // Format date and time
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

  // Sort and filter bookings
  const getSortedAndFilteredBookings = () => {
    let filtered = [...bookings];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.dropLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.mobile.includes(searchQuery) ||
        (b.email && b.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.id.toString().includes(searchQuery)
      );
    }

    // Sort
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
          return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
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
          <h1 className="text-3xl font-bold text-primary">BossCars Admin Dashboard</h1>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
            {/* Search */}
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

            {/* Sort By */}
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

            {/* Filter Status */}
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
                    key={booking.id}
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
                                Booking #{booking.id}
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
                              onClick={() => confirmBooking(booking.id)}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center gap-2"
                            >
                              <span>✓</span>
                              <span>Confirm & Send SMS</span>
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteBooking(booking.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                          >
                            ✗ Delete
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>
    </div>
  );
};

export default AdminPage;
