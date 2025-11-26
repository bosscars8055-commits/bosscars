/**
 * Image paths configuration
 * All images should be placed in the public/images folder
 * This ensures images work both locally and when deployed to Vercel
 */

// Logo
export const LOGO_PATH = '/images/logo.png'; // Your Boss Cars logo

// Background images
export const HERO_BACKGROUND = '/images/background.jpeg'; // Hero section background

// Car images - Matched to your actual image files
export const CAR_IMAGES = {
  'Honda City': '/images/cars/cars3.jpeg',     // cars3.jpeg
  'Sedan': '/images/cars/cars4.jpeg',          // cars4.jpeg
  'SUV': '/images/cars/cars1.jpeg',            // cars1.jpeg
  'Innova Crysta': '/images/cars/cars2.jpeg'   // cars2.jpeg
};

// Additional car image (cars4.jpeg) available if needed
export const EXTRA_CAR = '/images/cars/cars4.jpeg';

// Fallback/placeholder SVG if image not found
export const PLACEHOLDER_CAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect fill="%23f0f0f0" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="40"%3EImage%3C/text%3E%3C/svg%3E';

/**
 * Get car image path by vehicle name
 * @param {string} vehicleName - Name of the vehicle
 * @returns {string} - Path to the car image
 */
export const getCarImage = (vehicleName) => {
  return CAR_IMAGES[vehicleName] || PLACEHOLDER_CAR;
};

/**
 * Helper to check if image exists (optional - for error handling)
 * @param {string} imagePath - Path to check
 * @returns {Promise<boolean>}
 */
export const checkImageExists = async (imagePath) => {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
