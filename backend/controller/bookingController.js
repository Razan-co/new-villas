const Booking = require('../models/booking');
const User = require('../models/user');
const { sendCustomerEmail, sendOwnerEmail } = require('../utils/emailTransporter');

// Create booking (with Resend emails)
exports.createBooking = async (req, res) => {
  try {
    const { checkIn, checkOut, days, price, fullName, email, persons, address, phone, villaId } = req.body;
    const userId = req.user.id;

    // 1. Check date conflicts
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

    // 2. Create the booking
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

    console.log(`📝 Booking Created: ${booking._id}`);

    // 3. Send Emails (Fire and Forget)
    // The browser gets a response immediately, emails send in background
    Promise.all([
      sendCustomerEmail(booking),
      sendOwnerEmail(booking)
    ]).catch(err => console.error('⚠️ Background email error:', err));

    // 4. Success Response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully (Pending Confirmation)',
      data: booking,
    });

  } catch (err) {
    console.error('❌ Create booking error:', err);
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

// Update booking status (admin only)
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

// Get all bookings (admin only)
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
