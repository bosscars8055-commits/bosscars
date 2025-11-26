import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">Your trusted partner for comfortable journeys</p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-card">
              <div className="about-icon">🚗</div>
              <p className="about-description">
                We started <strong>Boss Cars</strong> to make intercity travel more reliable and comfortable for everyone. 
                With a strong commitment to safety, punctuality, and customer satisfaction, Boss Cars offers 
                well-maintained vehicles, verified drivers, and a hassle-free booking experience.
              </p>
              <p className="about-description">
                Our goal is to ensure every journey is smooth, enjoyable, and truly worthy of a <strong>'Boss' experience</strong>.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="about-features"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="feature-box">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Safety First</h3>
              <p className="feature-text">
                Verified drivers, well-maintained vehicles, and 24/7 support for your peace of mind.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">⏰</div>
              <h3 className="feature-title">Always On Time</h3>
              <p className="feature-text">
                Punctuality is our promise. We value your time as much as you do.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">💎</div>
              <h3 className="feature-title">Premium Comfort</h3>
              <p className="feature-text">
                Experience luxury and comfort in every ride with our well-maintained fleet.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Customer Satisfaction</h3>
              <p className="feature-text">
                Your satisfaction is our success. We go the extra mile for every customer.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="stats-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="stat-box">
            <div className="stat-number">500+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Trips Completed</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">10+</div>
            <div className="stat-label">Premium Vehicles</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Customer Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
