import { create } from "zustand";
import axios from "axios";

export const useBookingStore = create((set, get) => ({
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
  success: false,

  // LOAD ALL BOOKINGS
  fetchBookings: async () => {
  try {
    set({ loading: true, error: null });

    const res = await axios.get("/api/bookings");
    const data = res.data;

    const bookings =
      Array.isArray(data)
        ? data
        : Array.isArray(data.bookings)
        ? data.bookings
        : Array.isArray(data.data)
        ? data.data
        : [];

    set({ bookings, loading: false });

  } catch (error) {
    set({
      error: error.response?.data?.message || "Failed to load bookings",
      loading: false,
    });
  }
},
  // CREATE BOOKING
 // CREATE BOOKING
createBooking: async (payload) => {
  set({ error: null, success: false });

  const bookings = get().bookings;
  const newStart = new Date(payload.checkIn);
  const newEnd = new Date(payload.checkOut);

  const conflict = bookings.some((b) => {
    const start = new Date(b.checkIn);
    const end = new Date(b.checkOut);
    return newStart <= end && newEnd >= start;
  });

  if (conflict) {
    const msg = "These dates are already booked.";
    set({ error: msg });
    throw new Error(msg);
  }

  try {
    set({ loading: true });

    const res = await axios.post("/api/bookings", payload);

    const newBooking =
      res.data.booking ||
      res.data.data ||
      res.data;

    set((state) => ({
      bookings: [...state.bookings, newBooking],
      selectedBooking: newBooking,
      success: true,
      loading: false,
    }));

    return newBooking;
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to create booking";
    set({ error: msg, loading: false });
    throw new Error(msg);
  }
},

  // GET BOOKING BY ID
  fetchBookingById: async (id) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(`/api/bookings/${id}`);
      set({ selectedBooking: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Booking not found",
        loading: false,
      });
    }
  },

  // CANCEL BOOKING
  cancelBooking: async (id) => {
    try {
      set({ loading: true });

      await axios.delete(`/api/bookings/${id}`);

      set((state) => ({
        bookings: state.bookings.filter((b) => b._id !== id),
        selectedBooking: null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to cancel booking",
        loading: false,
      });
    }
  },

  resetStatus: () => set({ success: false, error: null }),
}));


// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useBookingStore = create(
//   persist(
//     (set, get) => ({
//       bookings: [],          // persisted safely
//       selectedBooking: null,
//       loading: false,
//       error: null,
//       success: false,

//       // CREATE BOOKING (with overlap check)
//   createBooking: async (payload) => {
//     // RESET previous error so toast can show again
//     set({ error: null, success: false });

//     const bookings = get().bookings;

//     const newStart = new Date(payload.checkIn);
//     const newEnd = new Date(payload.checkOut);

//     const conflict = bookings.some((b) => {
//       const start = new Date(b.checkIn);
//       const end = new Date(b.checkOut);
//       return newStart <= end && newEnd >= start;
//     });

//     if (conflict) {
//       const msg = "These dates are already booked.";
//       set({ error: msg, success: false });
//       throw new Error(msg);
//     }

//     const newBooking = {
//       ...payload,
//       _id: crypto.randomUUID(),
//       villaId: "single-villa-001",
//     };

//     const updated = [...bookings, newBooking];

//     set({
//       bookings: updated,
//       selectedBooking: newBooking,
//       success: true,
//       error: null,
//     });

//     return newBooking;
// },


//       // GET BOOKING BY ID
//       fetchBookingById: (id) => {
//         const booking = get().bookings.find((b) => b._id === id);
//         set({ selectedBooking: booking || null });
//       },

//       // CANCEL BOOKING
//       cancelBooking: (id) => {
//         const updated = get().bookings.filter((b) => b._id !== id);

//         set({
//           bookings: updated,
//           selectedBooking: null,
//         });
//       },

//       resetStatus: () => set({ success: false, error: null })
//     }),

//     {
//       name: "villa-bookings-storage", // <— UNIQUE key prevents overwrite issues
//     }
//   )
// );

