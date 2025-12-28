const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    persons: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    villaId: {
      type: String,
      default: 'villa-1',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ✅ move these OUT of userId
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    paymentConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt / updatedAt
);

module.exports = mongoose.model('Booking', bookingSchema);
