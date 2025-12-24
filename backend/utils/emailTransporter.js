const nodemailer = require('nodemailer');
require('dotenv').config();
const { customerConfirmationTemplate, ownerNotificationTemplate } = require('./emailTemplates');

// ✅ CONFIGURATION FOR RENDER (Using Port 465 to fix Timeout)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465, // CHANGED from 587 to 465 (SSL)
  secure: true, // Must be true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // reliability settings
  connectionTimeout: 10000, // Wait 10 seconds before failing
  greetingTimeout: 5000,
  tls: {
    rejectUnauthorized: false // Helps with cloud SSL handshake issues
  }
});

// Debugging: Verify connection immediately on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Transporter Error (Detailed):', error);
  } else {
    console.log('✅ SMTP Connection Established (Port 465 SSL)');
  }
});

const sendCustomerEmail = async (booking) => {
  const bookingRef = booking._id.toString().slice(-6).toUpperCase();
  console.log(`📧 Sending Customer Email to: ${booking.email}`);

  try {
    const info = await transporter.sendMail({
      from: `"Classy Villa Bookings" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Confirmed! Your Villa Stay #${bookingRef} 🎉`,
      html: customerConfirmationTemplate(booking),
    });
    console.log('✅ Customer Email Sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Failed to send Customer Email:', error.message);
    throw error; // Throwing allows Promise.allSettled to catch it
  }
};

const sendOwnerEmail = async (booking) => {
  console.log(`📧 Sending Owner Email to: ${process.env.RESORT_OWNER_EMAIL}`);

  try {
    const info = await transporter.sendMail({
      from: `"System Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.RESORT_OWNER_EMAIL,
      subject: `🆕 NEW BOOKING #${booking._id.toString().slice(-6).toUpperCase()}`,
      html: ownerNotificationTemplate(booking),
    });
    console.log('✅ Owner Email Sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Failed to send Owner Email:', error.message);
    throw error;
  }
};

module.exports = {
  sendCustomerEmail,
  sendOwnerEmail
};