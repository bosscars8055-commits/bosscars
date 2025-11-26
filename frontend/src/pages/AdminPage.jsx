import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated (in production, use proper auth tokens)
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchBookings();
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setLoginError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, loginData);

      if (response.data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuth', 'true');
        fetchBookings();
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/admin/bookings`);
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setLoginData({ username: '', password: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="login-container">
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="login-header">
              <h1 className="login-title">Boss Cars</h1>
              <h2 className="login-subtitle">Admin Login</h2>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  className="form-input"
                  placeholder="Enter admin username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="form-input"
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginError && (
                <motion.div 
                  className="login-error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {loginError}
                </motion.div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary login-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <button 
                type="button" 
                className="btn btn-secondary back-btn"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <motion.div 
          className="admin-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="admin-title">Boss Cars Admin</h1>
            <p className="admin-subtitle">Booking Management Dashboard</p>
          </div>
          <div className="admin-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="bookings-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="stat-card">
            <div className="stat-value">{bookings.length}</div>
            <div className="stat-label">Total Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {bookings.filter(b => new Date(b.createdAt).toDateString() === new Date().toDateString()).length}
            </div>
            <div className="stat-label">Today's Bookings</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {bookings.filter(b => b.vehicle === 'Swift Dzire').length}
            </div>
            <div className="stat-label">Swift Dzire</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {bookings.filter(b => b.vehicle === 'Innova').length}
            </div>
            <div className="stat-label">Innova</div>
          </div>
        </motion.div>

        <motion.div 
          className="bookings-table-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="table-header">
            <h2 className="table-title">All Bookings</h2>
            <button 
              className="btn btn-secondary"
              onClick={fetchBookings}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings found</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="bookings-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Pickup</th>
                    <th>Drop-off</th>
                    <th>Vehicle</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <motion.tr 
                      key={booking._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td>{index + 1}</td>
                      <td>{booking.name}</td>
                      <td>{booking.mobile}</td>
                      <td className="email-cell">{booking.email}</td>
                      <td>{booking.pickupLocation}</td>
                      <td>{booking.dropoffLocation}</td>
                      <td>
                        <span className={`vehicle-badge ${booking.vehicle.toLowerCase().replace(' ', '-')}`}>
                          {booking.vehicle}
                        </span>
                      </td>
                      <td>{formatDate(booking.createdAt)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
