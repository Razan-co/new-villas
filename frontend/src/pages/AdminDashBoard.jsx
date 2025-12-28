import React, { useEffect, useState } from "react";
import { useAdminStore } from "../store/adminStore";
import { useAuthStore } from "../store/authStore";
import dayjs from "dayjs";
import { Trash2, Calendar, User, RefreshCw } from "lucide-react";

export default function AdminDashboard() {
  const { user, loading: userLoading } = useAuthStore();
  const { bookings, loading, error, fetchAdminBookings, updateBookingStatus, deleteBooking } = useAdminStore();
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (userLoading) return;
    fetchAdminBookings();
  }, [userLoading, fetchAdminBookings]);

  const handleStatusChange = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    await updateBookingStatus(bookingId, newStatus);
    setUpdatingId(null);
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Delete this booking permanently?')) return;
    await deleteBooking(bookingId);
  };

  // Loading states
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-medium text-gray-300">Loading...</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-medium text-gray-300">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-md mx-auto text-center bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
          <div className="text-2xl font-semibold text-red-400 mb-6">{error}</div>
          <button
            onClick={fetchAdminBookings}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl font-semibold transition-all shadow-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Clean Header */}
      <div className="px-4 md:px-8 py-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm md:text-base text-gray-400 mt-1 font-medium">Manage bookings • {bookings.length} active</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-end lg:items-center w-full lg:w-auto">
            <div className="text-xs md:text-sm text-gray-500 text-right lg:text-left">
              Welcome, <span className="font-semibold text-white">{user?.name || 'Admin'}</span>
            </div>
            <button
              onClick={fetchAdminBookings}
              disabled={loading}
              className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"
            >
              <RefreshCw size={16} className={`transition-transform ${loading ? 'animate-spin' : 'group-hover:rotate-12'}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Compact Premium Table */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/70 backdrop-blur-sm border-b border-white/20">
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Guest</th>
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden sm:table-cell">Dates</th>
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider hidden md:table-cell">Amount</th>
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-3 md:px-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition-all duration-200 group">
                      {/* ID */}
                      <td className="py-3 px-3 md:px-4">
                        <span className="font-mono text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                          #{booking._id.toString().slice(-6).toUpperCase()}
                        </span>
                      </td>
                      
                      {/* Guest - Compact */}
                      <td className="py-3 px-3 md:px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                            <User size={14} className="text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm truncate text-white">{booking.fullName}</p>
                            <p className="text-xs text-gray-400 truncate">{booking.phone}</p>
                          </div>
                        </div>
                      </td>

                      {/* Dates - Compact */}
                      <td className="py-3 px-3 md:px-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="font-mono text-xs text-gray-300">
                              {dayjs(booking.checkIn).format('DD/MM')}
                            </p>
                            <p className="text-xs text-gray-500">→ {dayjs(booking.checkOut).format('DD/MM')}</p>
                          </div>
                        </div>
                      </td>

                      {/* Amount - Compact */}
                      <td className="py-3 px-3 md:px-4 hidden md:table-cell font-mono font-semibold text-emerald-400 text-sm">
                        ₹{booking.price?.toLocaleString('en-IN')}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 md:px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            booking.status === 'pending'
                              ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
                              : booking.status === 'confirmed'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-red-500/15 text-red-300 border border-red-500/30'
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions - Compact */}
                      <td className="py-3 px-3 md:px-4">
                        <div className="flex items-center gap-1">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                            disabled={updatingId === booking._id || loading}
                            className="bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-gray-500/70 text-white text-xs px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-semibold min-w-[85px] cursor-pointer transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/70 shadow-sm appearance-none
                                   disabled:bg-gray-900/50 disabled:cursor-not-allowed disabled:border-gray-700/50
                                   bg-no-repeat bg-[right_0.75rem_center] bg-arrow-down"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          
                          <button
                            onClick={() => handleDelete(booking._id)}
                            disabled={loading}
                            className="p-1.5 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg border border-red-500/30 hover:border-red-400/50 transition-all flex-shrink-0 group hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                            title="Delete"
                          >
                            <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {bookings.length === 0 && !loading && (
              <div className="text-center py-20 bg-white/2 backdrop-blur-sm rounded-2xl border border-dashed border-white/20">
                <Calendar size={48} className="mx-auto mb-6 text-gray-500" />
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No bookings yet</h3>
                <p className="text-gray-500 text-lg">Bookings will appear here when guests reserve</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//classyvilla@123