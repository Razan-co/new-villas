// src/store/adminStore.js
import { create } from 'zustand';
import ApiEndpoints from '../api/ApiEndpoints';
import apiClient from '../api/apiclient';

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

export const useAdminStore = create((set, get) => ({
  ...initialState,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Get all admin bookings
  fetchAdminBookings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.get(ApiEndpoints.ADMIN_BOOKINGS);
      set({ bookings: res.data.data, loading: false });
      return res.data.data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to fetch admin bookings';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status, paymentConfirmed = false) => {
    try {
      set({ loading: true, error: null });
      
      const url = ApiEndpoints.ADMIN_UPDATE_STATUS.replace(':id', bookingId);
      const res = await apiClient.put(url, { status, paymentConfirmed });

      // Update local state
      set((state) => ({
        loading: false,
        bookings: state.bookings.map((b) =>
          b._id === bookingId 
            ? { ...b, status: res.data.data.status, paymentConfirmed: res.data.data.paymentConfirmed }
            : b
        ),
      }));

      return res.data.data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to update booking';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Delete booking
  deleteBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });
      
      const url = ApiEndpoints.ADMIN_DELETE_BOOKING.replace(':id', bookingId);
      await apiClient.delete(url);

      // Remove from local state
      set((state) => ({
        loading: false,
        bookings: state.bookings.filter((b) => b._id !== bookingId),
      }));
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to delete booking';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
