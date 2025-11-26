import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './BookingSection.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    vehicle: '',
    bookingDate: '',
    bookingTime: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // Check URL parameters for pre-selected vehicle
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedVehicle = params.get('vehicle');
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicle: selectedVehicle
      }));
    }

    // Listen for vehicle selection events from service cards
    const handleVehicleSelected = (event) => {
      setFormData(prev => ({
        ...prev,
        vehicle: event.detail
      }));
    };

    window.addEventListener('vehicleSelected', handleVehicleSelected);
    return () => window.removeEventListener('vehicleSelected', handleVehicleSelected);
  }, []);

  const vehicles = [
    { value: '', label: 'Select a vehicle', category: '' },
    { value: 'Honda City', label: 'Honda City (4+1 Seating)', category: 'Cars' },
    { value: 'Sedan', label: 'Sedan (4+1 Seating)', category: 'Cars' },
    { value: 'SUV', label: 'SUV (6+1 Seating)', category: 'Cars' },
    { value: 'Innova Crysta', label: 'Innova Crysta (6+1 Seating)', category: 'Cars' },
    { value: 'Executive Bus', label: 'Executive Bus (25 Seats)', category: 'Travels' },
    { value: 'Travel Bus', label: 'Travel Bus (45 Seats)', category: 'Travels' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Mobile validation (10-digit Indian number)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit Indian mobile number';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Pickup location validation
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    }

    // Drop-off location validation
    if (!formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation = 'Drop-off location is required';
    }

    // Vehicle validation
    if (!formData.vehicle) {
      newErrors.vehicle = 'Please select a vehicle';
    }

    // Date validation
    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Please select a booking date';
    } else {
      const selectedDate = new Date(formData.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.bookingDate = 'Booking date cannot be in the past';
      }
    }

    // Time validation
    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Please select a booking time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Send to MongoDB backend
      const backendResponse = await axios.post(
        `${API_URL}/api/book`,
        {
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          vehicle: formData.vehicle,
          bookingDate: formData.bookingDate,
          bookingTime: formData.bookingTime
        }
      );

      console.log('Backend response:', backendResponse.data);

      // Send to Google Sheets
      try {
        const sheetsResponse = await axios.post(
          'https://script.google.com/macros/s/AKfycbx6MLNXyj3ouc1J3_nyAQbUQ6CXJ4SeK9xwONvJjzpb5u4FASMuJ3T0eA-U4neJrAWooA/exec',
          {
            name: formData.name,
            mobile: formData.mobile,
            email: formData.email,
            pickupLocation: formData.pickupLocation,
            dropoffLocation: formData.dropoffLocation,
            vehicle: formData.vehicle,
            bookingDate: formData.bookingDate,
            bookingTime: formData.bookingTime
          },
          {
            headers: {
              'Content-Type': 'text/plain',
            }
          }
        );
        console.log('Sheets response:', sheetsResponse.data);
      } catch (sheetsError) {
        console.error('Google Sheets error:', sheetsError);
        // Don't fail the whole booking if sheets fails
      }

      setSubmitMessage({
        type: 'success',
        text: 'Booking successful! We will contact you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        pickupLocation: '',
        dropoffLocation: '',
        vehicle: '',
        bookingDate: '',
        bookingTime: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || 'Booking failed. Please try again.';
      setSubmitMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-now" className="booking-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Book Your Ride</h2>
          <p className="section-subtitle">Fill in the details below to reserve your car</p>
        </motion.div>

        <motion.div 
          className="booking-form-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="mobile" className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`form-input ${errors.mobile ? 'error' : ''}`}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                {errors.mobile && <span className="form-error">{errors.mobile}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="pickupLocation" className="form-label">Pickup Location *</label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className={`form-input ${errors.pickupLocation ? 'error' : ''}`}
                  placeholder="Enter pickup location"
                />
                {errors.pickupLocation && <span className="form-error">{errors.pickupLocation}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dropoffLocation" className="form-label">Drop-off Location *</label>
                <input
                  type="text"
                  id="dropoffLocation"
                  name="dropoffLocation"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  className={`form-input ${errors.dropoffLocation ? 'error' : ''}`}
                  placeholder="Enter drop-off location"
                />
                {errors.dropoffLocation && <span className="form-error">{errors.dropoffLocation}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="vehicle" className="form-label">Select Vehicle *</label>
              <select
                id="vehicle"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className={`form-select ${errors.vehicle ? 'error' : ''}`}
              >
                <option value="">{vehicles[0].label}</option>
                <optgroup label="Cars">
                  {vehicles.filter(v => v.category === 'Cars').map(vehicle => (
                    <option key={vehicle.value} value={vehicle.value}>
                      {vehicle.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Travels">
                  {vehicles.filter(v => v.category === 'Travels').map(vehicle => (
                    <option key={vehicle.value} value={vehicle.value}>
                      {vehicle.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.vehicle && <span className="form-error">{errors.vehicle}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bookingDate" className="form-label">Booking Date *</label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                  className={`form-input ${errors.bookingDate ? 'error' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.bookingDate && <span className="form-error">{errors.bookingDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="bookingTime" className="form-label">Booking Time *</label>
                <input
                  type="time"
                  id="bookingTime"
                  name="bookingTime"
                  value={formData.bookingTime}
                  onChange={handleChange}
                  className={`form-input ${errors.bookingTime ? 'error' : ''}`}
                />
                {errors.bookingTime && <span className="form-error">{errors.bookingTime}</span>}
              </div>
            </div>

            {submitMessage && (
              <motion.div 
                className={`submit-message ${submitMessage.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitMessage.text}
              </motion.div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Book Now'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
