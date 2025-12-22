import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import dayjs from "dayjs"; // ✅ MISSING IMPORT ADDED
import { Clock, Phone, MapPin, Calendar, Users, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function BookingSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMyBookings } = useBookingStore();

  const [booking, setBooking] = useState(null);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [cancelled, setCancelled] = useState(false);

  const UPI_ID = "villa.resort@paytm"; // Replace with actual UPI
  const PROPERTY_PHONE = "+91 9876543210"; // Replace with actual number

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookings = await getMyBookings();
        const recentBooking = bookings.find(b => b._id === id);
        if (recentBooking) {
          setBooking(recentBooking);
        } else {
          toast.error("Booking not found");
          navigate("/booking");
        }
      } catch (err) {
        toast.error("Failed to fetch booking details");
        navigate("/booking");
      }
    };

    fetchBooking();
  }, [id, navigate, getMyBookings]);

  // ✅ FIXED: Timer effect dependency
  useEffect(() => {
    if (cancelled || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cancelled]); // ✅ Removed timeLeft from deps to prevent infinite loop

  const handleAutoCancel = async () => {
    setCancelled(true);
    toast.error("Booking auto-cancelled. Please book again.", { duration: 5000 });
    setTimeout(() => navigate("/booking"), 2000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0aa8e6] mx-auto mb-4"></div>
          <div className="text-xl">Loading booking details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-500/50">
            <CheckCircle size={48} className="text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0aa8e6] to-green-400 bg-clip-text text-transparent">
            Booking Locked!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your booking is temporarily reserved. Complete payment within 2 hours.
          </p>
        </div>

        {/* Timer Card */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/40 backdrop-blur-xl rounded-2xl p-8 mb-12 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Clock size={32} className={`animate-pulse ${timeLeft < 1800 ? 'text-red-400' : 'text-orange-400'}`} />
            <h2 className="text-2xl font-bold text-white">Payment Time Left</h2>
          </div>
          <div className={`text-4xl md:text-6xl font-mono font-bold px-8 py-4 rounded-xl border-4 inline-block transition-all ${
            timeLeft < 1800 
              ? 'bg-red-500/40 border-red-500/60 text-red-200 animate-pulse' 
              : 'bg-red-500/30 border-red-500/50 text-red-100'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <p className={`mt-4 text-lg font-semibold ${
            cancelled 
              ? 'text-gray-400' 
              : timeLeft < 1800 
              ? 'text-red-300 animate-pulse' 
              : 'text-yellow-300'
          }`}>
            {cancelled 
              ? "Booking auto-cancelled" 
              : "Make payment to confirm booking"
            }
          </p>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left - Booking Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar size={24} className="text-[#0aa8e6]" />
              Booking Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <Calendar size={24} className="text-[#0aa8e6]" />
                <div>
                  <p className="text-sm text-gray-400">Check In</p>
                  <p className="font-semibold text-lg">
                    {dayjs(booking.checkIn).format('DD MMM YYYY')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <Calendar size={24} className="text-[#0aa8e6]" />
                <div>
                  <p className="text-sm text-gray-400">Check Out</p>
                  <p className="font-semibold text-lg">
                    {dayjs(booking.checkOut).format('DD MMM YYYY')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <Users size={24} className="text-[#0aa8e6]" />
                <div>
                  <p className="text-sm text-gray-400">Guests</p>
                  <p className="font-semibold">{booking.persons} persons</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-[#0aa8e6]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#0aa8e6] font-bold text-lg">₹</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Amount</p>
                  <p className="text-2xl font-bold text-[#0aa8e6]">
                    ₹{booking.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Phone size={24} className="text-green-400" />
              Payment Instructions
            </h3>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 backdrop-blur-xl rounded-2xl p-8">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-green-400 mb-4">Pay to UPI</p>
                <div className="text-2xl md:text-3xl font-mono font-bold bg-green-500/20 px-6 py-4 rounded-xl border-2 border-green-500/50 inline-block break-all">
                  {UPI_ID}
                </div>
                <p className="text-sm text-green-300 mt-3 font-semibold">
                  Amount: ₹{booking.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/10 rounded-xl mb-6">
                <Phone size={24} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Contact Property</p>
                  <p className="text-green-300 font-mono">{PROPERTY_PHONE}</p>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/40 p-4 rounded-xl">
                <p className="text-yellow-200 text-sm font-medium text-center">
                  💡 After payment, share screenshot on WhatsApp {PROPERTY_PHONE}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to={'/book'}
            className="flex-1 max-w-md bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition-all text-center disabled:opacity-50"
            disabled={cancelled}
          >
            Book Another Date
          </Link>
          <Link to={'/my-bookings'}
            className="flex-1 max-w-md bg-[#0aa8e6] hover:bg-[#0895c9] text-white px-8 py-4 rounded-xl font-semibold transition-all text-center"
          >
            View All Bookings
          </Link>
        </div>

        {/* Booking ID */}
        <div className="mt-12 text-center text-gray-400 text-sm bg-white/5 p-6 rounded-xl backdrop-blur-sm">
          <p className="mb-2">
            Booking ID: <span className="font-mono font-semibold text-white text-lg">{id}</span>
          </p>
          <p>
            Expires in <span className="font-mono font-bold text-red-400">{formatTime(timeLeft)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
