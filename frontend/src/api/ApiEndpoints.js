// src/constants/ApiEndpoints.js
class ApiEndpoints {
  static BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

  // Auth
  static AUTH_SIGNUP = "/api/auth/signup";
  static AUTH_LOGIN = "/api/auth/login";
  static AUTH_FORGOT_PASSWORD = "/api/auth/forgot-password";
  static AUTH_RESET_PASSWORD = "/api/auth/reset-password";
  static AUTH_CHANGE_PASSWORD = "/api/auth/change-password";
  static AUTH_LOGOUT = "/api/auth/logout";

  // Booking (user)
  static BOOKING_AVAILABILITY = "/api/booking/availability";
  static BOOKING_CREATE = "/api/booking";
  static BOOKING_MY_BOOKINGS = "/api/booking/my-bookings";
  static BOOKING_CANCEL = "/api/booking/:id/cancel";

  // Admin
  static ADMIN_BOOKINGS = "/api/admin/bookings";
  static ADMIN_UPDATE_STATUS = "/api/admin/bookings/:id/status";
  static ADMIN_DELETE_BOOKING = "/api/admin/bookings/:id";

  // Helpers
  static bookingCancelUrl(id) {
    return `/api/booking/${id}/cancel`;
  }
  static adminUpdateStatusUrl(id) {
    return `/api/admin/bookings/${id}/status`;
  }
  static adminDeleteBookingUrl(id) {
    return `/api/admin/bookings/${id}`;
  }
}

export default ApiEndpoints;
