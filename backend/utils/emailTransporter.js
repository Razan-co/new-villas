const nodemailer = require('nodemailer');
require('dotenv').config();
const { customerConfirmationTemplate, ownerNotificationTemplate } = require('./emailTemplates');

// ✅ FIXED TRANSPORTER FOR RENDER
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Use the direct hostname
  port: 587, // Switch back to 587 (STARTTLS) - often more reliable on Render than 465
  secure: false, // Must be false for port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // ⬇️ CRITICAL FIXES FOR RENDER ⬇️
  family: 4, // Force IPv4 (Fixes ETIMEDOUT on cloud servers)
  logger: true, // Logs SMTP traffic to console for easier debugging
  debug: true,  // Includes payload in logs
  tls: {
    rejectUnauthorized: false, // Accept self-signed certs if necessary
    ciphers: 'SSLv3' // Force legacy cipher support if handshake fails
  },
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000,    // 5 seconds
  socketTimeout: 10000      // 10 seconds
});

// Verify connection immediately
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Failed:', error);
  } else {
    console.log('✅ SMTP Server Ready (IPv4 Forced)');
  }
});

const sendCustomerEmail = async (booking) => {
  const bookingRef = booking._id.toString().slice(-6).toUpperCase();
  console.log(`📧 Attempting to send to customer: ${booking.email}`);

  try {
    const info = await transporter.sendMail({
      from: `"Classy Villa Bookings" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Confirmed! Your Villa Stay #${bookingRef} 🎉`,
      html: customerConfirmationTemplate(booking),
    });
    console.log('✅ Customer Email Sent. ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Customer Email Failed:', error.message);
    throw error;
  }
};

const sendOwnerEmail = async (booking) => {
  console.log(`📧 Attempting to send to owner: ${process.env.RESORT_OWNER_EMAIL}`);

  try {
    const info = await transporter.sendMail({
      from: `"System Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.RESORT_OWNER_EMAIL,
      subject: `🆕 NEW BOOKING #${booking._id.toString().slice(-6).toUpperCase()}`,
      html: ownerNotificationTemplate(booking),
    });
    console.log('✅ Owner Email Sent. ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Owner Email Failed:', error.message);
    throw error;
  }
};

module.exports = {
  sendCustomerEmail,
  sendOwnerEmail
};