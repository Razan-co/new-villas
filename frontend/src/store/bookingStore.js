// src/store/bookingStore.js
import { create } from 'zustand';
import ApiEndpoints from '../api/ApiEndpoints';
import apiClient from '../api/apiclient';

const initialState = {
  bookings: [],
  bookedDates: [],
  loading: false,
  error: null,
};

export const useBookingStore = create((set, get) => ({
  ...initialState,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Get availability (marks booked dates)
  fetchAvailability: async () => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.get(ApiEndpoints.BOOKING_AVAILABILITY);
      set({ bookedDates: res.data.data, loading: false });
      return res.data.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Failed to fetch availability';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Create booking
  createBooking: async (bookingData) => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.post(
        ApiEndpoints.BOOKING_CREATE,
        bookingData
      );

      // Refresh availability
      await get().fetchAvailability();

      set({ loading: false });
      return res.data.data;
    } catch (err) {
      const message = err?.response?.data?.message || 'Booking failed';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Get user bookings
  getMyBookings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.get(ApiEndpoints.BOOKING_MY_BOOKINGS);
      set({ bookings: res.data.data, loading: false });
      return res.data.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Failed to fetch bookings';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Admin: get all bookings
  getAllBookings: async () => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.get(ApiEndpoints.BOOKING_ADMIN_ALL);
      set({ bookings: res.data.data, loading: false });
      return res.data.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Failed to fetch admin bookings';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // ✅ Cancel booking (user)
  cancelBooking: async (bookingId) => {
    try {
      set({ loading: true, error: null });

      // call backend cancel endpoint
      const url = ApiEndpoints.BOOKING_CANCEL.replace(':id', bookingId);
      await apiClient.delete(url);

      // locally update bookings list: mark status = cancelled
      set((state) => ({
        loading: false,
        bookings: state.bookings.map((b) =>
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ),
      }));
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Failed to cancel booking';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
