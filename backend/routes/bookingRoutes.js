const express = require('express');
const { protect } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');
const { 
  createBooking, 
  getUserBookings, 
  getBookingsForAvailability,
  updateBookingStatus,
  getAllBookings,
  cancelBooking,            // ✅ add
} = require('../controller/bookingController');

const router = express.Router();

// ✅ Public: Get bookings for date availability
router.get('/availability', getBookingsForAvailability);

// ✅ User: Create booking (login required)
router.post('/', protect, createBooking);

// ✅ User: Get my bookings (login required)
router.get('/my-bookings', protect, getUserBookings);

// ✅ User: Cancel own booking within 24h
router.delete('/:id/cancel', protect, cancelBooking);

// ✅ ADMIN ONLY: Update booking status
router.put('/:id/status', protect, admin, updateBookingStatus);

// ✅ ADMIN ONLY: Get all bookings
router.get('/admin/all', protect, admin, getAllBookings);

module.exports = router;
