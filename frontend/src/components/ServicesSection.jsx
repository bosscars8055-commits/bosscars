import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ServicesSection.css';

const ServicesSection = () => {
  const carsScrollRef = useRef(null);
  const travelsScrollRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});

  const cars = [
    {
      id: 1,
      name: 'Honda City',
      seating: '4+1',
      description: 'Premium sedan with superior comfort and style. Perfect for business and leisure travel.',
      features: ['AC', 'Premium Interior', 'Smooth Ride'],
      image: '/images/cars/cars3.jpeg',
      category: 'car'
    },
    {
      id: 2,
      name: 'Sedan',
      seating: '4+1',
      description: 'Elegant sedan for comfortable city and highway travel. Perfect for professionals.',
      features: ['AC', 'GPS', 'Premium Sound'],
      image: '/images/cars/cars4.jpeg',
      category: 'car'
    },
    {
      id: 3,
      name: 'SUV',
      seating: '6+1',
      description: 'Spacious SUV ideal for family trips and group travel. Maximum comfort for long journeys.',
      features: ['AC', 'Spacious', 'Premium Comfort'],
      image: '/images/cars/cars1.jpeg',
      category: 'car'
    },
    {
      id: 4,
      name: 'Innova Crysta',
      seating: '6+1',
      description: 'Premium MPV with superior comfort and space. Ideal for family trips and group outings.',
      features: ['AC', 'Luxurious', 'Smooth Drive'],
      image: '/images/cars/cars2.jpeg',
      category: 'car'
    }
  ];

  const travels = [
    {
      id: 5,
      name: 'Executive Bus',
      seating: '25 Seats',
      description: 'Comfortable executive bus perfect for corporate trips and group travel.',
      features: ['AC', 'Comfortable Seating', 'Large Luggage Space'],
      image: '/images/cars/Travels_bus2.jpeg',
      category: 'travel'
    },
    {
      id: 6,
      name: 'Travel Bus',
      seating: '45 Seats',
      description: 'Spacious travel bus with amenities for large group tours and long-distance travel.',
      features: ['AC', 'Reclining Seats', 'Entertainment System'],
      image: '/images/cars/Travels_bus1.jpeg',
      category: 'travel'
    }
  ];

  // Auto-scroll effect for cars
  useEffect(() => {
    const scrollContainer = carsScrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const autoScroll = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
      }
    }, scrollInterval);

    const handleMouseEnter = () => clearInterval(autoScroll);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(autoScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  // Auto-scroll effect for travels
  useEffect(() => {
    const scrollContainer = travelsScrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 30;

    const autoScroll = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0;
        }
      }
    }, scrollInterval);

    const handleMouseEnter = () => clearInterval(autoScroll);
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(autoScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  // Generate vehicle SVG illustration
  const VehicleSVG = ({ type, category }) => {
    const colors = {
      'car': '#2E86AB',
      'travel': '#A23B72'
    };

    const selectedColor = colors[category] || '#2E86AB';

    if (category === 'travel') {
      return (
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="car-svg">
          <defs>
            <linearGradient id={`busGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: selectedColor, stopOpacity: 0.9 }} />
              <stop offset="100%" style={{ stopColor: selectedColor, stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          {/* Bus body */}
          <rect x="100" y="150" width="600" height="180" rx="15" 
            fill={`url(#busGradient-${type})`} stroke={selectedColor} strokeWidth="3" />
          {/* Windows */}
          <rect x="130" y="180" width="80" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          <rect x="230" y="180" width="80" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          <rect x="330" y="180" width="80" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          <rect x="430" y="180" width="80" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          <rect x="530" y="180" width="80" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          <rect x="630" y="180" width="50" height="60" rx="5" fill="#E0E7FF" opacity="0.8" />
          {/* Wheels */}
          <circle cx="200" cy="340" r="35" fill="#2C3E50" />
          <circle cx="200" cy="340" r="20" fill="#7F8C8D" />
          <circle cx="600" cy="340" r="35" fill="#2C3E50" />
          <circle cx="600" cy="340" r="20" fill="#7F8C8D" />
          {/* Headlights */}
          <circle cx="680" cy="200" r="8" fill="#FFD700" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" className="car-svg">
        <defs>
          <linearGradient id={`carGradient-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: selectedColor, stopOpacity: 0.9 }} />
            <stop offset="100%" style={{ stopColor: selectedColor, stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        {/* Car body */}
        <path 
          d="M 150 250 L 200 180 L 350 170 L 450 180 L 500 250 L 650 250 L 650 280 L 600 300 L 200 300 L 150 280 Z" 
          fill={`url(#carGradient-${type})`}
          stroke={selectedColor}
          strokeWidth="3"
        />
        <path d="M 220 200 L 250 185 L 320 185 L 340 200 Z" fill="#E0E7FF" opacity="0.8" />
        <path d="M 360 200 L 380 185 L 430 185 L 440 200 Z" fill="#E0E7FF" opacity="0.8" />
        {/* Wheels */}
        <circle cx="250" cy="310" r="35" fill="#2C3E50" />
        <circle cx="250" cy="310" r="20" fill="#7F8C8D" />
        <circle cx="550" cy="310" r="35" fill="#2C3E50" />
        <circle cx="550" cy="310" r="20" fill="#7F8C8D" />
        {/* Details */}
        <line x1="350" y1="200" x2="350" y2="250" stroke={selectedColor} strokeWidth="2" />
        <circle cx="620" cy="240" r="8" fill="#FFD700" />
      </svg>
    );
  };

  return (
    <section id="services" className="services-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Choose from our premium fleet of vehicles</p>
        </motion.div>

        {/* Cars Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="category-title">Cars</h3>
          <motion.div 
            className="services-carousel"
            ref={carsScrollRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {cars.map((car, index) => (
              <motion.div 
                key={`car-${car.id}-${index}`}
                className="car-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="car-image-container">
                  {!imageErrors[car.name] ? (
                    <img 
                      src={car.image}
                      alt={car.name}
                      className="car-image-real"
                      onError={() => setImageErrors(prev => ({ ...prev, [car.name]: true }))}
                    />
                  ) : (
                    <VehicleSVG type={car.name.toLowerCase().replace(' ', '-')} category="car" />
                  )}
                </div>
                
                <div className="car-info">
                  <h3 className="car-name">{car.name}</h3>
                  <div className="car-seating">
                    <span className="seating-badge">{car.seating} Seating</span>
                  </div>
                  <p className="car-description">{car.description}</p>
                  
                  <div className="car-features">
                    {car.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="btn btn-secondary car-cta"
                    onClick={() => {
                      // Set the vehicle in the booking form
                      const event = new CustomEvent('vehicleSelected', { detail: car.name });
                      window.dispatchEvent(event);
                      
                      // Scroll to booking section
                      setTimeout(() => {
                        const bookingSection = document.getElementById('book-now');
                        if (bookingSection) {
                          bookingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Book {car.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Travels Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '60px' }}
        >
          <h3 className="category-title">Travels</h3>
          <motion.div 
            className="services-carousel"
            ref={travelsScrollRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {travels.map((vehicle, index) => (
              <motion.div 
                key={`travel-${vehicle.id}-${index}`}
                className="car-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="car-image-container">
                  {!imageErrors[vehicle.name] ? (
                    <img 
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="car-image-real"
                      onError={() => setImageErrors(prev => ({ ...prev, [vehicle.name]: true }))}
                    />
                  ) : (
                    <VehicleSVG type={vehicle.name.toLowerCase().replace(' ', '-')} category="travel" />
                  )}
                </div>
                
                <div className="car-info">
                  <h3 className="car-name">{vehicle.name}</h3>
                  <div className="car-seating">
                    <span className="seating-badge">{vehicle.seating} Seating</span>
                  </div>
                  <p className="car-description">{vehicle.description}</p>
                  
                  <div className="car-features">
                    {vehicle.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="btn btn-secondary car-cta"
                    onClick={() => {
                      // Set the vehicle in the booking form
                      const event = new CustomEvent('vehicleSelected', { detail: vehicle.name });
                      window.dispatchEvent(event);
                      
                      // Scroll to booking section
                      setTimeout(() => {
                        const bookingSection = document.getElementById('book-now');
                        if (bookingSection) {
                          bookingSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                  >
                    Book {vehicle.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.p 
          className="carousel-hint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Hover to pause • Scroll to explore
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesSection;
