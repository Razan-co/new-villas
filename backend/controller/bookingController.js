const Booking = require('../models/booking');
const User = require('../models/user');
const { customerConfirmationTemplate, ownerNotificationTemplate } = require('../utils/emailTemplates');
const transporter = require('../utils/emailTransporter');


// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { checkIn, checkOut, days, price, fullName, email, persons, address, phone, villaId } = req.body;
    const userId = req.user.id;

    // Check date conflicts
    const existingBooking = await Booking.findOne({
      villaId,
      $or: [
        { checkIn: { $lte: new Date(checkOut) }, checkOut: { $gte: new Date(checkIn) } },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Dates conflict with existing booking',
      });
    }

    const booking = await Booking.create({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      days,
      price,
      fullName,
      email,
      persons,
      address,
      phone,
      villaId,
      userId,
      status: 'pending',
      paymentConfirmed: false,
    });

    // ✅ SEND EMAILS AFTER SUCCESSFUL CREATION (FIXED)
    try {
      // Convert ObjectId to string for email templates
      const bookingId = booking._id.toString();
      const bookingRef = bookingId.slice(-6).toUpperCase();

      // 1. Customer confirmation email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: `Booking Confirmed! Your Villa Stay #${bookingRef}`,
        html: customerConfirmationTemplate(booking),
      });

      // 2. Owner notification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.RESORT_OWNER_EMAIL,
        subject: `🆕 New Booking Received - ₹${booking.price.toLocaleString('en-IN')}`,
        html: ownerNotificationTemplate(booking),
      });

      console.log('✅ Both confirmation emails sent successfully');
      console.log('Booking ID:', bookingRef);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully (Pending Confirmation)',
      data: booking,
    });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// Get bookings by user ID (protected)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');

    res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error('Get user bookings error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get all bookings for date availability (public)
exports.getBookingsForAvailability = async (req, res) => {
  try {
    const bookings = await Booking.find({ villaId: 'villa-1' })
      .select('checkIn checkOut')
      .lean();

    res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error('Get bookings availability error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add these new functions
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentConfirmed } = req.body;

    // Only admin can update
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, paymentConfirmed },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({
      success: true,
      message: `Booking ${status}`,
      data: booking,
    });
  } catch (err) {
    console.error('Update booking status error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // Only admin can see all bookings
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (err) {
    console.error('Get all bookings error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


