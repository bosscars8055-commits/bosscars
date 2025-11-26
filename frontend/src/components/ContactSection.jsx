import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', mobile: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch with us for any queries or support</p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="info-title">Our Location</h3>
              <p className="info-text">
                2/541 T Kadai Bus Stop<br />
                Settikarai, Dharmapuri<br />
                Tamil Nadu - 636704<br />
                India
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3 className="info-title">Phone Number</h3>
              <p className="info-text">
                <a href="tel:+919345775733">+91 93457 75733</a><br />
                <a href="tel:+916374813552">+91 63748 13552</a>
              </p>
              <p className="info-subtext">Available 24/7</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3 className="info-title">Email Address</h3>
              <p className="info-text">
                <a href="mailto:avl628259@gmail.com">avl628259@gmail.com</a><br />
                <a href="mailto:bosscars8055@gmail.com">bosscars8055@gmail.com</a>
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">📷</div>
              <h3 className="info-title">Follow Us</h3>
              <p className="info-text">
                <a href="https://www.instagram.com/boss.tours_travels__?igsh=dWZlOW5xdHlyeDdx" target="_blank" rel="noopener noreferrer">@boss.tours_travels__</a><br />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Follow us on Instagram</span>
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="contact-form-card">
              <h3 className="form-title">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-mobile" className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    id="contact-mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Write your message here..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="footer-content">
          <p>&copy; 2025 Boss Cars. All rights reserved.</p>
          <p className="footer-tagline">Ride Like a Boss 🚗</p>
        </div>
      </motion.footer>
    </section>
  );
};

export default ContactSection;
