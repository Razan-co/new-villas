import React, { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore(); // ✅ Using our store's user & logout
  
  const isAuthenticated = !!user; // ✅ Check if user exists
  const fullName = user?.name || "Profile"; // ✅ Get name from user object
console.log(user)
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4 md:px-12 py-10 flex items-center justify-between h-16">

        {/* ✅ LEFT — LOGO */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Classy Villas Logo" 
            className="w-24 h-20 rounded-full"
          />
        </div>

        {/* ✅ CENTER — MENU */}
        <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
          <li><Link to="/gallery" className="hover:text-gray-300">Gallery</Link></li>
          <li><Link to="/support" className="hover:text-gray-300">Support</Link></li>

          {/* ✅ BOOKING + MY BOOKINGS ONLY WHEN LOGGED IN */}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/book" className="hover:text-gray-300">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-gray-300">
                  My Bookings
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* ✅ RIGHT — AUTH SECTION */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {/* ✅ Profile + Bookings */}
              <div className="flex items-center gap-2 bg-[#8BB6B1] text-black px-4 py-2 rounded-xl font-semibold">
                <User size={20} />
                <span>{fullName}</span>
              </div>

              {/* ✅ Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-80 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            /* ✅ Login Button - ONLY when NOT logged in */
            <Link
              to="/login"
              className="bg-[#8BB6B1] text-black px-6 py-2 rounded-xl font-semibold hover:bg-[#8BB6B1]/90 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* ✅ MOBILE MENU ICON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ✅ MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black text-center pb-6 space-y-4 text-lg font-medium flex flex-col items-center">

          <Link to="/" className="hover:text-gray-300 py-2">Home</Link>
          <Link to="/about" className="hover:text-gray-300 py-2">About</Link>
          <Link to="/gallery" className="hover:text-gray-300 py-2">Gallery</Link>
          <Link to="/support" className="hover:text-gray-300 py-2">Support</Link>

          {/* ✅ BOOKING + MY BOOKINGS ONLY WHEN LOGGED IN */}
          {isAuthenticated && (
            <>
              <Link to="/booking" className="hover:text-gray-300 py-2">Booking</Link>
              <Link to="/my-bookings" className="hover:text-gray-300 py-2">My Bookings</Link>
            </>
          )}

          {isAuthenticated ? (
            <>
              {/* ✅ Profile + Logout */}
              <div className="flex items-center gap-2 bg-[#8BB6B1] text-black px-4 py-2 rounded-xl font-semibold">
                <User size={20} />
                {fullName}
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="bg-red-500 px-6 py-2 rounded-xl text-white font-semibold hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            /* ✅ Login Button - ONLY when NOT logged in */
            <Link
              to="/login"
              className="bg-[#8BB6B1] text-black px-6 py-2 rounded-xl font-semibold hover:bg-[#8BB6B1]/90 transition-all"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
