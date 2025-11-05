import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

class GoogleSheetsService {
  constructor() {
    this.isConfigured = false;
    this.sheets = null;
    this.spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    this.initialize();
  }

  initialize() {
    try {
      // Check if required environment variables are set
      if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || 
          !process.env.GOOGLE_SHEETS_PRIVATE_KEY || 
          !this.spreadsheetId ||
          process.env.GOOGLE_SHEETS_CLIENT_EMAIL.includes('your-service-account') ||
          process.env.GOOGLE_SHEETS_PRIVATE_KEY.includes('YOUR_PRIVATE_KEY_HERE') ||
          this.spreadsheetId.includes('your_spreadsheet_id')) {
        console.log('⚠️  Google Sheets: Not configured. Set credentials in .env file.');
        return;
      }

      // Create auth client
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      this.sheets = google.sheets({ version: 'v4', auth });
      this.isConfigured = true;
      console.log('✅ Google Sheets: Configured successfully');
    } catch (error) {
      console.error('❌ Google Sheets initialization error:', error.message);
    }
  }

  async ensureHeaders() {
    if (!this.isConfigured) return false;

    try {
      // Check if sheet has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:O1'
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Sheet1!A1:O1',
          valueInputOption: 'RAW',
          resource: {
            values: [[
              'Booking ID',
              'Name',
              'Type',
              'Car Type',
              'Pickup Location',
              'Drop Location',
              'Travel Date',
              'Travel Time',
              'Email',
              'Mobile',
              'Status',
              'Booking Date',
              'Booking Time',
              'Created At',
              'Updated At'
            ]]
          }
        });
        console.log('✅ Google Sheets: Headers added');
      }
      return true;
    } catch (error) {
      console.error('❌ Google Sheets ensureHeaders error:', error.message);
      return false;
    }
  }

  async addBooking(booking) {
    if (!this.isConfigured) {
      console.log('⚠️  Google Sheets not configured. Skipping sync.');
      return false;
    }

    try {
      await this.ensureHeaders();

      const bookingDate = new Date(booking.createdAt);
      const bookingDateStr = bookingDate.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
      const bookingTimeStr = bookingDate.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      const values = [[
        booking._id.toString(),
        booking.name || 'N/A',
        booking.type,
        booking.carType || 'N/A',
        booking.pickupLocation,
        booking.dropLocation,
        booking.date,
        booking.time,
        booking.email || 'N/A',
        booking.mobile,
        booking.status,
        bookingDateStr,
        bookingTimeStr,
        booking.createdAt.toISOString(),
        booking.updatedAt.toISOString()
      ]];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:O',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: { values }
      });

      console.log(`✅ Booking ${booking._id} synced to Google Sheets`);
      return true;
    } catch (error) {
      console.error('❌ Google Sheets addBooking error:', error.message);
      return false;
    }
  }

  async updateBooking(booking) {
    if (!this.isConfigured) {
      console.log('⚠️  Google Sheets not configured. Skipping sync.');
      return false;
    }

    try {
      // Find the row with this booking ID
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:A'
      });

      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(row => row[0] === booking._id.toString());

      if (rowIndex === -1) {
        // Booking not found in sheet, add it
        return await this.addBooking(booking);
      }

      const bookingDate = new Date(booking.createdAt);
      const bookingDateStr = bookingDate.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
      const bookingTimeStr = bookingDate.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      // Update the row (rowIndex + 1 because sheets are 1-indexed)
      const range = `Sheet1!A${rowIndex + 1}:O${rowIndex + 1}`;
      const values = [[
        booking._id.toString(),
        booking.name || 'N/A',
        booking.type,
        booking.carType || 'N/A',
        booking.pickupLocation,
        booking.dropLocation,
        booking.date,
        booking.time,
        booking.email || 'N/A',
        booking.mobile,
        booking.status,
        bookingDateStr,
        bookingTimeStr,
        booking.createdAt.toISOString(),
        booking.updatedAt.toISOString()
      ]];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: { values }
      });

      console.log(`✅ Booking ${booking._id} updated in Google Sheets`);
      return true;
    } catch (error) {
      console.error('❌ Google Sheets updateBooking error:', error.message);
      return false;
    }
  }

  async syncAllBookings(bookings) {
    if (!this.isConfigured) {
      console.log('⚠️  Google Sheets not configured. Skipping sync.');
      return false;
    }

    try {
      await this.ensureHeaders();

      const values = bookings.map(booking => {
        const bookingDate = new Date(booking.createdAt);
        const bookingDateStr = bookingDate.toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        });
        const bookingTimeStr = bookingDate.toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });

        return [
          booking._id.toString(),
          booking.name || 'N/A',
          booking.type,
          booking.carType || 'N/A',
          booking.pickupLocation,
          booking.dropLocation,
          booking.date,
          booking.time,
          booking.email || 'N/A',
          booking.mobile,
          booking.status,
          bookingDateStr,
          bookingTimeStr,
          booking.createdAt.toISOString(),
          booking.updatedAt.toISOString()
        ];
      });

      // Clear existing data (except header)
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A2:O'
      });

      // Add all bookings
      if (values.length > 0) {
        await this.sheets.spreadsheets.values.append({
          spreadsheetId: this.spreadsheetId,
          range: 'Sheet1!A2:O',
          valueInputOption: 'RAW',
          resource: { values }
        });
      }

      console.log(`✅ Synced ${bookings.length} bookings to Google Sheets`);
      return true;
    } catch (error) {
      console.error('❌ Google Sheets syncAllBookings error:', error.message);
      return false;
    }
  }

  // Review-related methods
  async ensureReviewHeaders() {
    if (!this.isConfigured) return false;

    try {
      // Check if Reviews sheet exists, if not create it
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });

      const reviewSheet = spreadsheet.data.sheets.find(
        sheet => sheet.properties.title === 'Reviews'
      );

      if (!reviewSheet) {
        // Create Reviews sheet
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: [{
              addSheet: {
                properties: {
                  title: 'Reviews',
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 12
                  }
                }
              }
            }]
          }
        });
        console.log('✅ Google Sheets: Reviews sheet created');
      }

      // Check if Reviews sheet has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Reviews!A1:L1'
      });

      if (!response.data.values || response.data.values.length === 0) {
        // Add headers to Reviews sheet
        await this.sheets.spreadsheets.values.update({
          spreadsheetId: this.spreadsheetId,
          range: 'Reviews!A1:L1',
          valueInputOption: 'RAW',
          resource: {
            values: [[
              'Review ID',
              'Customer Name',
              'Booking ID',
              'Service Type',
              'Rating',
              'Comment',
              'Trip Date',
              'Verified',
              'Verified At',
              'Submitted At',
              'Created At',
              'Updated At'
            ]]
          }
        });
        console.log('✅ Google Sheets: Review headers added');
      }
      return true;
    } catch (error) {
      console.error('❌ Google Sheets ensureReviewHeaders error:', error.message);
      return false;
    }
  }

  async addReview(review) {
    if (!this.isConfigured) {
      console.log('⚠️  Google Sheets not configured. Skipping review sync.');
      return false;
    }

    try {
      await this.ensureReviewHeaders();

      const submittedDate = new Date(review.createdAt);
      const submittedDateStr = submittedDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      const submittedTimeStr = submittedDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const tripDateStr = review.tripDate 
        ? new Date(review.tripDate).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        : 'N/A';

      const verifiedAtStr = review.verifiedAt
        ? new Date(review.verifiedAt).toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
        : 'Not Verified';

      const values = [[
        review._id.toString(),
        review.customerName,
        review.bookingId.toString(),
        review.serviceType || 'N/A',
        review.rating,
        review.comment,
        tripDateStr,
        review.verified ? 'Yes' : 'No',
        verifiedAtStr,
        `${submittedDateStr} ${submittedTimeStr}`,
        review.createdAt.toISOString(),
        review.updatedAt.toISOString()
      ]];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Reviews!A2:L',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: { values }
      });

      console.log(`✅ Review added to Google Sheets: ${review._id}`);
      return true;
    } catch (error) {
      console.error('❌ Google Sheets addReview error:', error.message);
      return false;
    }
  }

  async syncAllReviews() {
    if (!this.isConfigured) {
      return { success: false, error: 'Google Sheets not configured', count: 0 };
    }

    try {
      await this.ensureReviewHeaders();

      // Import Review model dynamically to avoid circular dependency
      const Review = (await import('../models/Review.js')).default;
      
      // Get all verified and approved reviews
      const reviews = await Review.find({ 
        verified: true, 
        isApproved: true 
      }).sort({ createdAt: -1 });

      if (reviews.length === 0) {
        console.log('⚠️  No verified reviews to sync');
        return { success: true, count: 0 };
      }

      // Clear existing data (keep headers)
      await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: 'Reviews!A2:L'
      });

      // Prepare all review data
      const values = reviews.map(review => {
        const submittedDate = new Date(review.createdAt);
        const submittedDateStr = submittedDate.toLocaleDateString('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const submittedTimeStr = submittedDate.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const tripDateStr = review.tripDate
          ? new Date(review.tripDate).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            })
          : 'N/A';

        const verifiedAtStr = review.verifiedAt
          ? new Date(review.verifiedAt).toLocaleString('en-IN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          : 'Not Verified';

        return [
          review._id.toString(),
          review.customerName,
          review.bookingId.toString(),
          review.serviceType || 'N/A',
          review.rating,
          review.comment,
          tripDateStr,
          review.verified ? 'Yes' : 'No',
          verifiedAtStr,
          `${submittedDateStr} ${submittedTimeStr}`,
          review.createdAt.toISOString(),
          review.updatedAt.toISOString()
        ];
      });

      // Write all data at once
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Reviews!A2:L',
        valueInputOption: 'RAW',
        resource: { values }
      });

      console.log(`✅ Synced ${reviews.length} reviews to Google Sheets`);
      return { success: true, count: reviews.length };
    } catch (error) {
      console.error('❌ Google Sheets syncAllReviews error:', error.message);
      return { success: false, error: error.message, count: 0 };
    }
  }
}

// Create singleton instance
const googleSheetsService = new GoogleSheetsService();

export default googleSheetsService;
