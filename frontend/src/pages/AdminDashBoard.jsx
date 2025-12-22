import React, { useState, useEffect } from "react";
import { useBookingStore } from "../store/bookingStore";
import { useAuthStore } from "../store/authStore";

export default function AdminBookings() {
  const { getAllBookings, loading } = useBookingStore();
  const { user } = useAuthStore();
  
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await getAllBookings();
    setBookings(data);
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await apiClient.put(ApiEndpoints.BOOKING_UPDATE_STATUS.replace(':id', bookingId), {
        status,
        paymentConfirmed: status === 'confirmed'
      });
      toast.success(`Booking ${status}`);
      fetchBookings(); // Refresh list
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin - All Bookings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xl">₹{booking.price.toLocaleString()}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                booking.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {booking.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-6">
              <p><strong>{booking.fullName}</strong></p>
              <p>{booking.email}</p>
              <p>{booking.phone}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-6">
              <div>{dayjs(booking.checkIn).format('DD MMM')}</div>
              <div>{dayjs(booking.checkOut).format('DD MMM')}</div>
              <div>{booking.days} days</div>
              <div>{booking.persons} guests</div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(booking._id, 'confirmed')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                disabled={booking.status === 'confirmed'}
              >
                Confirm
              </button>
              <button
                onClick={() => updateStatus(booking._id, 'cancelled')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                disabled={booking.status === 'cancelled'}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
