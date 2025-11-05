import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: 'Car Rentals',
      description: 'Comfortable and stylish cars for your personal travel needs',
      features: ['Sedan', 'SUV', 'Luxury Cars', 'Self-Drive Options']
    },
    {
      title: 'Bus Services',
      description: 'Group travel made easy with our spacious and comfortable buses',
      features: ['Mini Bus', 'AC Coach', 'Tourist Bus', 'Corporate Transport']
    },
    {
      title: 'Tour Packages',
      description: 'Complete tour packages with experienced drivers and guides',
      features: ['City Tours', 'Outstation Trips', 'Multi-day Tours', 'Custom Packages']
    }
  ];

  return (
    <section id="services" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide premium transportation solutions for all your travel needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-primary mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
