import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const vehicleTypes = [
    {
      category: 'Cars',
      types: ['Sedan', 'SUV', 'Innova Crysta']
    },
    {
      category: 'Buses',
      types: ['Mini Bus (14-20 seats)', 'AC Coach (35-50 seats)', 'Tourist Bus', 'Luxury Coach']
    }
  ];

  // Your actual vehicle images with descriptions
  const sliderImages = [
    {
      url: '/cars1.jpeg',
      title: 'Premium Sedan Fleet',
      description: 'Experience comfort and luxury with our well-maintained premium sedans. Perfect for city rides, airport transfers, and business meetings.'
    },
    {
      url: '/cars2.jpeg',
      title: 'SUV Collection',
      description: 'Spacious and powerful SUVs for family trips and group travels. Enjoy extra luggage space and comfortable seating for long journeys.'
    },
    {
      url: '/cars3.jpeg',
      title: 'Executive Cars',
      description: 'Travel in style with our executive car range. Ideal for corporate events, special occasions, and VIP services.'
    },
    {
      url: '/cars4.jpeg',
      title: 'Luxury Vehicles',
      description: 'Premium luxury cars for those who appreciate the finer things. Make every journey a memorable experience.'
    },
    {
      url: '/Travels_bus1.jpeg',
      title: 'Tourist Coaches',
      description: 'Modern AC coaches with comfortable seating for group tours and long-distance travel. Perfect for family outings and corporate trips.'
    },
    {
      url: '/Travels_bus2.jpeg',
      title: 'Mini Bus Service',
      description: 'Compact and efficient mini buses for small groups. Ideal for weddings, events, and local sightseeing tours.'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BossCars is your trusted partner for comfortable and reliable transportation. 
            We offer a wide range of vehicles to suit every travel need.
          </p>
        </motion.div>

        {/* Image Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Fleet</h3>
          
          {/* Slider Container */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Slides */}
            <div className="relative min-h-[500px] md:min-h-[400px]">
              {sliderImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    x: currentSlide === index ? 0 : currentSlide < index ? '100%' : '-100%',
                    opacity: currentSlide === index ? 1 : 0,
                    scale: currentSlide === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute inset-0 p-6 md:p-10"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                    {/* Image Container */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={currentSlide === index ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full md:w-1/2"
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-xl">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={currentSlide === index ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="w-full md:w-1/2 text-center md:text-left"
                    >
                      <h4 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        {image.title}
                      </h4>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {image.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-primary">
                        <span className="text-2xl">★</span>
                        <span className="text-lg font-semibold">Premium Quality Service</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-primary hover:text-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-primary hover:text-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-primary w-8 h-3'
                      : 'bg-gray-400 hover:bg-gray-600 w-3 h-3'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {vehicleTypes.map((vehicle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{vehicle.category}</h3>
              <ul className="space-y-4">
                {vehicle.types.map((type, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center text-gray-700 text-lg"
                  >
                    <span className="text-primary mr-3 text-xl">→</span>
                    {type}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="text-4xl mb-3">✓</div>
              <h4 className="font-semibold text-lg mb-2">Reliable</h4>
              <p className="text-gray-600">On-time service guaranteed</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">💰</div>
              <h4 className="font-semibold text-lg mb-2">Affordable</h4>
              <p className="text-gray-600">Competitive pricing</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h4 className="font-semibold text-lg mb-2">Safe</h4>
              <p className="text-gray-600">Experienced drivers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
