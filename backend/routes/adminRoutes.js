const express = require('express');
const { protect } = require('../middlewares/auth');
const { admin } = require('../middlewares/admin');
const {
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} = require('../controller/adminController');

const router = express.Router();

// ✅ Admin: Get all bookings
router.get('/bookings', protect, admin, getAllBookings);

// ✅ Admin: Update booking status
router.put('/bookings/:id/status', protect, admin, updateBookingStatus);

// ✅ Admin: Delete booking
router.delete('/bookings/:id', protect, admin, deleteBooking);

module.exports = router;
