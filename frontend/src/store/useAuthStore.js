// src/stores/useAuthStore.js
import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  mobile: "",
  fullName: "Unknown",
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,

  setMobile: (mobile) => set({ mobile }),

  // -------------------
  // REQUEST OTP
  // -------------------
  requestLoginOtp: async (mobile, fullName) => {
    set({ loading: true, error: null, success: false });

    try {
      // store mobile + fullName
      set({ mobile, fullName });

      const res = await axios.post(
        "http://localhost:5000/api/auth/request-login-otp",
        { mobile, fullName }
      );

      set({ loading: false, success: true });
      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Failed to send OTP",
      });
    }
  },

  // -------------------
  // VERIFY OTP
  // -------------------
  verifyLoginOtp: async (otp) => {
    set({ loading: true, error: null });

    try {
      const { mobile, fullName } = useAuthStore.getState();

      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-login-otp",
        { mobile, fullName, otp }
      );

      set({
        loading: false,
        isAuthenticated: true,
        fullName: res.data?.fullName || fullName,
        mobile: res.data?.mobile || mobile,
      });

      return res.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Invalid OTP",
      });
    }
  },

  // -------------------
  // LOGOUT
  // -------------------
  logoutUser: async () => {
    set({ loading: true, error: null });

    try {
      await axios.post("http://localhost:5000/api/auth/logout-user");

      set({
        mobile: "",
        fullName: "Unknown",
        isAuthenticated: false,
        success: false,
        loading: false,
      });

      localStorage.removeItem("otp_expiry");
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },

  // -------------------
  // CHECK AUTH
  // -------------------
  checkAuth: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/auth-check",
        { withCredentials: true }
      );

      if (res.data?.authenticated) {
        set({
          isAuthenticated: true,
          mobile: res.data?.mobile || "",
          fullName: res.data?.fullName || "Unknown",
          loading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          mobile: "",
          fullName: "Unknown",
          loading: false,
        });
      }

      return res.data;
    } catch (err) {
      set({
        isAuthenticated: false,
        mobile: "",
        fullName: "Unknown",
        loading: false,
        error: err.response?.data?.message || "Auth check failed",
      });
    }
  },
}));
