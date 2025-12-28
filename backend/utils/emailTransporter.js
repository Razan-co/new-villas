require('dotenv').config();
const { Resend } = require('resend'); 
const { customerConfirmationTemplate, ownerNotificationTemplate, customerCancelTemplate, ownerCancelTemplate } = require('./emailTemplates');

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const sendCustomerEmail = async (booking) => {
  const bookingRef = booking._id.toString().slice(-6).toUpperCase();
  console.log(`📧 Sending to Customer: ${booking.email}`);

  try {
    const data = await resend.emails.send({
      // ✅ VITAL: Use your VERIFIED domain here to avoid spam
      from: 'Classy Villa Reservations <bookings@theclassyvilla.com>',
      
      // ✅ Customer replies will go to your Gmail
      reply_to: process.env.RESORT_OWNER_EMAIL, 
      
      to: [booking.email],
      subject: `Booking Confirmed! Your Villa Stay #${bookingRef} 🎉`,
      html: customerConfirmationTemplate(booking),
    });

    console.log('✅ Customer Email Sent via Resend:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Resend Customer Email Failed:', error);
    // Return null instead of throwing so the owner email still tries to send
    return null;
  }
};

const sendOwnerEmail = async (booking) => {
  console.log(`📧 Sending to Owner: ${process.env.RESORT_OWNER_EMAIL}`);

  try {
    const data = await resend.emails.send({
      from: 'System Alert <bookings@theclassyvilla.com>',
      to: [process.env.RESORT_OWNER_EMAIL],
      subject: `🆕 NEW BOOKING #${booking._id.toString().slice(-6).toUpperCase()}`,
      html: ownerNotificationTemplate(booking),
    });

    console.log('✅ Owner Email Sent via Resend:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Resend Owner Email Failed:', error);
    return null;
  }
};

const sendCustomerCancelEmail = async (booking) => {
  const bookingRef = booking._id.toString().slice(-6).toUpperCase();
  console.log(`📧 Cancel → Customer: ${booking.email}`);

  try {
    const data = await resend.emails.send({
      from: 'Classy Villa Reservations <bookings@theclassyvilla.com>',
      reply_to: process.env.RESORT_OWNER_EMAIL,
      to: [booking.email],
      subject: `Booking Cancelled #${bookingRef} ❌`,
      html: customerCancelTemplate(booking),
    });

    console.log('✅ Customer Cancel Email Sent:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Customer Cancel Email Failed:', error);
    return null;
  }
};

const sendOwnerCancelEmail = async (booking) => {
  console.log(`📧 Cancel → Owner: ${process.env.RESORT_OWNER_EMAIL}`);

  try {
    const data = await resend.emails.send({
      from: 'System Alert <bookings@theclassyvilla.com>',
      to: [process.env.RESORT_OWNER_EMAIL],
      subject: `🚫 Booking #${booking._id.toString().slice(-6).toUpperCase()} CANCELLED`,
      html: ownerCancelTemplate(booking),
    });

    console.log('✅ Owner Cancel Email Sent:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Owner Cancel Email Failed:', error);
    return null;
  }
};

module.exports = {
  sendCustomerEmail,
  sendOwnerEmail,
  sendCustomerCancelEmail,  
  sendOwnerCancelEmail,     
};