import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import VillaDetails from "./pages/VillaDetails";
import {useAuthStore} from './store/authStore'
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
import BookingSuccess from "./pages/BookingSuccess";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashBoard";

export default function App() {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth(); // ✅ Runs once on app load
  }, []);

  const location = useLocation();

  // Pages without navbar & footer
  const noLayoutPages = ["/login", "/otp","/signup","/admin"];
  const hideLayout = noLayoutPages.includes(location.pathname);

  // ✅ PERFECT Admin Guard - waits for initialized flag
  const AdminGuard = ({ children }) => {
    const { user, loading: userLoading, initialized } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      // Wait for auth to be FULLY initialized
      if (!initialized || userLoading) return;
      
      if (!user) {
        navigate('/login', { replace: true });
        return;
      }
      
      if (user.role !== 'admin') {
        navigate('/', { replace: true });
        return;
      }
    }, [user, userLoading, initialized, navigate]);

    // Show loading until fully initialized
    if (!initialized || userLoading) {
      return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl font-medium text-gray-300">Loading...</div>
          </div>
        </div>
      );
    }

    return children;
  };

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginMail/>} />
        <Route path="/signup" element={<SignupMail/>} />

        {/* MAIN ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<VillaGallery />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/detail" element={<VillaDetails />} />
        <Route path="/book" element={<BookingFormNew />} />
        <Route path="/my-bookings" element={<BookedDetail />} />
        <Route path="/booking-success/:id" element={<BookingSuccess/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/teams" element={<TeamsAndCareers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/term" element={<Term />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/trust" element={<Trust />} />
        
        {/* ✅ NOW PERFECTLY PROTECTED */}
        <Route 
          path="/admin" 
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          } 
        />
      </Routes>

      {!hideLayout && <Footer />}
      <Toaster position="top-center" />
    </>
  );
}
