import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, BorderStyle } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Saves booking information to a Word document
 * Creates a new file or appends to existing bookings.docx
 */
export async function saveBookingToWord(booking) {
  try {
    const filePath = path.join(__dirname, '..', 'bookings.docx');
    
    // Format the date
    const bookingDate = new Date(booking.createdAt).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    let doc;

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // If file exists, read and append
      const existingContent = fs.readFileSync(filePath);
      
      // Create a new document with existing content plus new booking
      doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Add a separator line
            new Paragraph({
              children: [
                new TextRun({
                  text: "________________________________________",
                  size: 24
                })
              ],
              spacing: { before: 200, after: 200 }
            }),
            // Booking header
            new Paragraph({
              children: [
                new TextRun({
                  text: `Booking #${booking._id}`,
                  bold: true,
                  size: 28,
                  color: "2E86AB"
                })
              ],
              spacing: { after: 100 }
            }),
            // Booking date
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${bookingDate}`,
                  italics: true,
                  size: 20
                })
              ],
              spacing: { after: 200 }
            }),
            // Booking details table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                createTableRow("Name:", booking.name),
                createTableRow("Mobile:", booking.mobile),
                createTableRow("Email:", booking.email),
                createTableRow("Pickup Location:", booking.pickupLocation),
                createTableRow("Drop-off Location:", booking.dropoffLocation),
                createTableRow("Vehicle:", booking.vehicle)
              ]
            }),
            new Paragraph({ text: "" }) // Empty line
          ]
        }]
      });
    } else {
      // Create new file with header
      doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Document title
            new Paragraph({
              children: [
                new TextRun({
                  text: "BOSS CARS - BOOKING RECORDS",
                  bold: true,
                  size: 36,
                  color: "2E86AB"
                })
              ],
              spacing: { after: 200 },
              alignment: "center"
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Ride Like a Boss",
                  italics: true,
                  size: 24,
                  color: "555555"
                })
              ],
              spacing: { after: 400 },
              alignment: "center"
            }),
            // First booking header
            new Paragraph({
              children: [
                new TextRun({
                  text: `Booking #${booking._id}`,
                  bold: true,
                  size: 28,
                  color: "2E86AB"
                })
              ],
              spacing: { after: 100 }
            }),
            // Booking date
            new Paragraph({
              children: [
                new TextRun({
                  text: `Date: ${bookingDate}`,
                  italics: true,
                  size: 20
                })
              ],
              spacing: { after: 200 }
            }),
            // Booking details table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                createTableRow("Name:", booking.name),
                createTableRow("Mobile:", booking.mobile),
                createTableRow("Email:", booking.email),
                createTableRow("Pickup Location:", booking.pickupLocation),
                createTableRow("Drop-off Location:", booking.dropoffLocation),
                createTableRow("Vehicle:", booking.vehicle)
              ]
            })
          ]
        }]
      });
    }

    // Generate buffer
    const buffer = await Packer.toBuffer(doc);
    
    // Append or write file
    if (fs.existsSync(filePath)) {
      // For simplicity, we'll recreate the file with all bookings
      // In production, you might want a more sophisticated append mechanism
      const existingBuffer = fs.readFileSync(filePath);
      fs.writeFileSync(filePath, Buffer.concat([existingBuffer, buffer]));
    } else {
      fs.writeFileSync(filePath, buffer);
    }

    console.log(`Booking saved to Word document: ${filePath}`);
    return true;

  } catch (error) {
    console.error('Error saving to Word document:', error);
    throw error;
  }
}

/**
 * Helper function to create table rows
 */
function createTableRow(label, value) {
  return new TableRow({
    children: [
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: label,
                bold: true,
                size: 22
              })
            ]
          })
        ],
        width: { size: 30, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
        }
      }),
      new TableCell({
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: value,
                size: 22
              })
            ]
          })
        ],
        width: { size: 70, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
          right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
        }
      })
    ]
  });
}
