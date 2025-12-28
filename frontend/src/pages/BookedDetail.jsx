import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import dayjs from "dayjs";
import { Calendar, Phone, X } from "lucide-react";

export default function MyBookings() {
  const navigate = useNavigate();
  const {
    bookings,
    loading,
    error,
    getMyBookings,
    cancelBooking,
  } = useBookingStore();
  const [cancelDialog, setCancelDialog] = useState({ open: false, bookingId: null });
  const [cancellingId, setCancellingId] = useState(null);

  // Load bookings on mount
  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  // Handle cancel with custom dialog
  const openCancelDialog = (bookingId) => {
    setCancelDialog({ open: true, bookingId });
  };

  const closeCancelDialog = () => {
    setCancelDialog({ open: false, bookingId: null });
  };

  const confirmCancel = async () => {
    if (!cancelDialog.bookingId) return;

    setCancellingId(cancelDialog.bookingId);
    closeCancelDialog();

    try {
      await cancelBooking(cancelDialog.bookingId);
    } catch (err) {
      // Error handled by store
    } finally {
      setCancellingId(null);
    }
  };

  // UI STATES (same as before)
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="md:min-h-screen h-[70vh] bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            No bookings found
          </h2>
          <button
            onClick={() => navigate("/book")}
            className="bg-[#0aa8e6] hover:bg-[#0895c9] px-8 py-3 rounded-xl font-semibold transition"
          >
            Book Villa Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="md:min-h-screen h-[70vh] bg-black text-white pt-32 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My Bookings
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-white/5 to-black/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
              >
                {/* STATUS */}
                <div className="flex justify-between mb-6">
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : booking.status === "confirmed"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {booking.status}
                  </div>
                </div>

                {/* DATES */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3 p-4 bg-white/5 rounded-xl">
                    <Calendar size={20} className="text-[#0aa8e6]" />
                    <div>
                      <p className="font-semibold">
                        {dayjs(booking.checkIn).format("DD MMM YYYY")}
                      </p>
                      <p className="text-sm text-gray-400">
                        {dayjs(booking.checkOut).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CONTACT */}
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl mb-6">
                  <p className="text-sm text-green-300 mb-2">
                    Contact for Payment
                  </p>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-green-400" />
                    <span className="font-mono text-green-300">
                      {booking.phone}
                    </span>
                  </div>
                </div>

                {/* STATUS MESSAGE + ACTION */}
                {booking.status === "pending" && (
                  <div className="space-y-4">
                    <div className="bg-yellow-500/20 border border-yellow-500/40 p-4 rounded-xl text-center">
                      ⏰ Waiting for confirmation
                    </div>
                    <button
                      onClick={() => openCancelDialog(booking._id)}
                      disabled={cancellingId === booking._id}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-xl transition"
                    >
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel Booking"}
                    </button>
                  </div>
                )}

                {booking.status === "confirmed" && (
                  <div className="bg-green-500/20 border border-green-500/40 p-4 rounded-xl text-center">
                    ✅ Payment Confirmed
                  </div>
                )}

                {booking.status === "cancelled" && (
                  <div className="bg-red-500/20 border border-red-500/40 p-4 rounded-xl text-center">
                    ❌ Booking Cancelled
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ CUSTOM CONFIRMATION MODAL */}
      {cancelDialog.open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-white/10 to-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Cancel Booking?
              </h2>
              <button
                onClick={closeCancelDialog}
                className="p-2 hover:bg-white/10 rounded-xl transition"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-300 mb-8 text-lg leading-relaxed">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={closeCancelDialog}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/20 transition"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
