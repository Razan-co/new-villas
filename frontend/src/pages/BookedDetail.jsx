import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import dayjs from "dayjs";
import { Clock, Calendar, Phone } from "lucide-react";

export default function MyBookings() {
  const navigate = useNavigate();
  const { bookings, loading, error, getMyBookings } = useBookingStore();
  const [timeLeft, setTimeLeft] = useState({});

  // Load bookings on mount
  useEffect(() => {
    getMyBookings();
  }, [getMyBookings]);

  // ✅ REAL LIVE TIMER (SYNCED WITH SERVER TIME)
  useEffect(() => {
    if (!bookings || bookings.length === 0) return;

    const interval = setInterval(() => {
      const timers = {};

      bookings.forEach((booking) => {
        if (booking.status === "pending" && booking.createdAt) {
          const expiryTime = dayjs(booking.createdAt).add(2, "hour");
          const now = dayjs();
          const diff = expiryTime.diff(now, "second");

          timers[booking._id] = Math.max(0, diff);
        }
      });

      setTimeLeft(timers);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  // Format MM:SS
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // UI STATES
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
            onClick={() => navigate("/booking")}
            className="bg-[#0aa8e6] hover:bg-[#0895c9] px-8 py-3 rounded-xl font-semibold transition"
          >
            Book Villa Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen h-[70vh] bg-black text-white pt-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My Bookings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map((booking) => {
            const bookingTimeLeft = timeLeft[booking._id] || 0;

            return (
              <div
                key={booking._id}
                className="bg-gradient-to-br from-white/5 to-black/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
              >
                {/* STATUS + TIMER */}
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
                    {booking.status === "pending" && bookingTimeLeft > 0 && (
                      <Clock size={16} className="inline mr-2" />
                    )}
                    {booking.status}
                  </div>

                  {booking.status === "pending" && bookingTimeLeft > 0 && (
                    <div
                      className={`px-4 py-2 rounded-xl font-mono font-bold ${
                        bookingTimeLeft < 1800
                          ? "bg-red-500/30 text-red-300 animate-pulse"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {formatTime(bookingTimeLeft)}
                    </div>
                  )}
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

                {/* ACTION STATES */}
                {booking.status === "pending" && bookingTimeLeft > 0 && (
                  <div className="bg-yellow-500/20 border border-yellow-500/40 p-4 rounded-xl text-center">
                    ⏰ Pay within{" "}
                    <strong>{formatTime(bookingTimeLeft)}</strong>
                  </div>
                )}

                {booking.status === "pending" && bookingTimeLeft === 0 && (
                  <div className="bg-orange-500/20 border border-orange-500/40 p-4 rounded-xl text-center">
                    ⏰ Time Expired – Waiting for admin
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
            );
          })}
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useBookingStore } from "../store/useBookingStore";
// import toast from "react-hot-toast";

// export default function BookedDetail() {
//   const navigate = useNavigate();

//   const {
//     bookings,
//     loading,
//     error,
//     fetchBookings,
//     cancelBooking,
//   } = useBookingStore();

//   // Load all bookings when page opens
//   useEffect(() => {
//     fetchBookings();
//   }, [fetchBookings]);

//   // Handle cancel
//   const handleCancel = async (id) => {
//     try {
//       await cancelBooking(id);
//       toast.success("Booking cancelled");
//       fetchBookings(); // refresh list after deletion
//     } catch (err) {
//       toast.error(err.message || "Unable to cancel booking");
//     }
//   };

//   // UI states
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Loading bookings...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center">
//         Error: {error}
//       </div>
//     );
//   }

//   if (!bookings || bookings.length === 0) {
//     return (
//       <div data-scroll-section className="md:min-h-screen h-[70vh] bg-black text-white flex items-center justify-center">
//         No bookings found.
//       </div>
//     );
//   }

//   return (
//     <div
//       data-scroll-section
//       className="md:min-h-screen h-[70vh] bg-black text-white pt-32 px-6 md:px-16"
//     >
//       <h1 className="text-3xl md:text-4xl font-bold mb-6">
//         All Booked Details
//       </h1>

//       <div className="space-y-8 max-w-3xl">
//         {bookings.map((b) => (
//           <div key={b._id} className="bg-white/10 p-6 rounded-xl space-y-3">
//             <p>
//               <strong>Name:</strong> {b.fullName}
//             </p>
//             <p>
//               <strong>Email:</strong> {b.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {b.phone}
//             </p>
//             <p>
//               <strong>Address:</strong> {b.address}
//             </p>
//             <p>
//               <strong>Check-in:</strong> {b.checkIn}
//             </p>
//             <p>
//               <strong>Check-out:</strong> {b.checkOut}
//             </p>
//             <p>
//               <strong>Total Days:</strong> {b.days}
//             </p>
//             <p>
//               <strong>Villa:</strong> {b.villaId}
//             </p>

//             <button
//               onClick={() => handleCancel(b._id)}
//               className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-md font-semibold text-white w-full"
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useBookingStore } from "../store/useBookingStore";
// // import toast from "react-hot-toast";

// // export default function BookedDetail() {
// //   const navigate = useNavigate();
// //   const { bookings, cancelBooking } = useBookingStore();

// //   // If no bookings exist
// //   if (!bookings || bookings.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-black text-white flex items-center justify-center">
// //         No bookings found.
// //       </div>
// //     );
// //   }

// //   const handleCancel = (id) => {
// //     cancelBooking(id);
// //     toast.success("Booking cancelled");
// //   };

// //   return (
// //     <div data-scroll-section className="min-h-screen bg-black text-white pt-32 px-6 md:px-16">
// //       <h1 className="text-3xl md:text-4xl font-bold mb-6">All Booked Details</h1>

// //       <div className="space-y-8 max-w-3xl">
// //         {bookings.map((b) => (
// //           <div key={b._id} className="bg-white/10 p-6 rounded-xl space-y-3">

// //             <p><strong>Name:</strong> {b.fullName}</p>
// //             <p><strong>Email:</strong> {b.email}</p>
// //             <p><strong>Phone:</strong> {b.phone}</p>
// //             <p><strong>Address:</strong> {b.address}</p>
// //             <p><strong>Check-in:</strong> {b.checkIn}</p>
// //             <p><strong>Check-out:</strong> {b.checkOut}</p>
// //             <p><strong>Total Days:</strong> {b.days}</p>
// //             <p><strong>Villa:</strong> {b.villaId}</p>

// //             <button
// //               onClick={() => handleCancel(b._id)}
// //               className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-md font-semibold text-white w-full"
// //             >
// //               Cancel Booking
// //             </button>

// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


