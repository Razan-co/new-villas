// src/store/authStore.js
import { create } from 'zustand';
import apiClient from '../api/apiclient';
import ApiEndpoints from '../api/ApiEndpoints';


const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const useAuthStore = create((set,get) => ({
  ...initialState,
   checkAuth: async () => {
    try {
      set({ loading: true, error: null });
      
      const res = await apiClient.get('/api/auth/profile');
      const user = res.data?.data?.user || null;
      
      if (user) {
        set({ user, loading: false });
        return user;
      }
      
      set({ loading: false });
      return null;
    } catch (err) {
      set({ loading: false });
      return null;
    }
  },

  // ✅ FIXED: Now uses get() correctly
  initializeAuth: async () => {
    await get().checkAuth(); // ✅ get() works now
  },

  // Helpers
  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),

  // Signup
  signup: async ({ name, email, phone, password }) => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_SIGNUP, {
        name,
        email,
        phone,
        password,
      });

      const user = res.data?.data?.user || null;
      set({ user, loading: false });

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Signup failed. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Login
  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_LOGIN, {
        email,
        password,
      });

      const user = res.data?.data?.user || null;
      set({ user, loading: false });

      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Login failed. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Forgot password
  forgotPassword: async ({ email }) => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_FORGOT_PASSWORD, {
        email,
      });

      set({ loading: false });
      return res.data; // contains resetToken in dev
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        'Failed to send reset email. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Reset password (with reset token)
  resetPassword: async ({ token, password }) => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_RESET_PASSWORD, {
        token,
        password,
      });

      set({ loading: false });
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        'Failed to reset password. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Change password (requires auth cookie)
  changePassword: async ({ email, oldPassword, newPassword }) => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_CHANGE_PASSWORD, {
        email,
        oldPassword,
        newPassword,
      });

      set({ loading: false });
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        'Failed to change password. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true, error: null });

      const res = await apiClient.post(ApiEndpoints.AUTH_LOGOUT);

      set({ user: null, loading: false });
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Logout failed. Please try again.';
      set({ error: message, loading: false });
      throw err;
    }
  },
}));
