import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import VillaDetails from "./pages/VillaDetails";
import Login from "./pages/Login";
import OTP from "./pages/OTP";
import {useAuthStore}from './store/authStore'
import BookingForm from "./pages/BookingForm";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import BookedDetail from "./pages/BookedDetail";
import ContactUs from "./pages/ContactUs";
import TeamsAndCareers from "./pages/TeamsAndCareers";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Term from "./pages/Term";
import Guest from "./pages/Guest";
import Trust from "./pages/Trust";
import VillaGallery from "./pages/VillaGallery";
import LoginMail from "./pages/LoginMail";
import SignupMail from "./pages/SignupMail";
import BookingFormNew from "./pages/BookingFormNew";
import AdminBookings from "./pages/AdminDashBoard";
import BookingSuccess from "./pages/BookingSuccess";
import { useEffect } from "react";

export default function App() {

  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth(); // ✅ Runs once on app load
  }, []);
  const location = useLocation();

  // Pages without navbar & footer
  const noLayoutPages = ["/login", "/otp","/signup"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {/* ✅ SHOW NAVBAR ONLY WHEN NOT LOGIN/OTP */}
      {!hideLayout && <Navbar />}

      {/* ✅ ROUTES */}
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginMail/>} />
        <Route path="/signup" element={<SignupMail/>} />
        {/* <Route path="/otp" element={<OTP />} /> */}

        {/* MAIN ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<VillaGallery />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/detail" element={<VillaDetails />} />
        <Route path="/book" element={<BookingFormNew />} />
        {/* <Route path="/book" element={<BookingForm />} /> */}
        <Route path="/my-bookings" element={<BookedDetail />} />
        <Route path="/booking-success/:id" element={<BookingSuccess/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/teams" element={<TeamsAndCareers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/term" element={<Term />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/trust" element={<Trust />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>

      {/* ✅ FOOTER ONLY ON NORMAL PAGES */}
      {!hideLayout && <Footer />}

      <Toaster position="top-center" />
    </>
  );
}
