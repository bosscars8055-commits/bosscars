import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BookingSection from '../components/BookingSection';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HeroSection />
      <BookingSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
