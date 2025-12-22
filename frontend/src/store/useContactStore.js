import { create } from "zustand";
import axios from "axios";

export const useContactStore = create((set) => ({
  loading: false,
  error: null,
  success: false,

  sendMessage: async (payload) => {
    try {
      set({ loading: true, error: null, success: false });

      // POST to backend
      await axios.post("/api/contact", payload);

      set({ loading: false, success: true });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to send message",
      });
    }
  },

  resetStatus: () => set({ success: false, error: null }),
}));
