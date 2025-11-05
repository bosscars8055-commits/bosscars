import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import BookingForm from '../components/BookingForm';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <BookingForm />
      <Reviews />
      <ReviewForm />
      <About />
      <Contact />
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 BossCars. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
