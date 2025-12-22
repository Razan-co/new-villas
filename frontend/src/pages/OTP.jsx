import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowLeft } from "lucide-react";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 DIGITS
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const { mobile, verifyLoginOtp, requestLoginOtp, loading, error } =
    useAuthStore();

  useEffect(() => {
    const expiry = localStorage.getItem("otp_expiry");
    if (expiry) {
      setTimer(Math.max(Math.floor((expiry - Date.now()) / 1000), 0));
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    const res = await verifyLoginOtp(enteredOtp);

    if (res?.authenticated) {
      toast.success("OTP verified successfully!");
      navigate("/"); // FIXED
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!mobile) {
      toast.error("No mobile number found.");
      return;
    }

    const { fullName } = useAuthStore.getState(); // FIXED

    const res = await requestLoginOtp(mobile, fullName);

    if (res) {
      localStorage.setItem("otp_expiry", Date.now() + 120000);
      setTimer(120);
      setOtp(["", "", "", "", "", ""]);
      toast.success("OTP resent successfully!");
    } else {
      toast.error("Failed to resend OTP.");
    }
  };

return (
  <div className="relative w-full h-screen flex items-center justify-center">

       <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 
                   text-white bg-black/40 backdrop-blur-md p-4
                   rounded-full hover:bg-black/60 transition"
      >
        <ArrowLeft size={20} />
      </button>

    {/* Background Image */}
    <img
      src="/login.png"
      className="absolute inset-0 w-full h-full object-cover opacity-70"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* OTP CARD — same style as login */}
    <div className="relative z-10 w-[90%] max-w-md bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg text-center">

      <h2 className="text-3xl font-semibold text-white mb-2">Enter OTP</h2>

      <p className="text-gray-200 mb-6">
        6 digit OTP sent to +91-{mobile}
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-center gap-3 mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-bold 
                       rounded-lg bg-white/20 text-white 
                       border border-white/40 outline-none"
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mt-3">{error}</p>
      )}

      {/* Timer */}
      <div className="text-center mt-4">
        {timer > 0 ? (
          <p className="text-gray-200">
            Resend in {String(Math.floor(timer / 60)).padStart(2, "0")}:
            {String(timer % 60).padStart(2, "0")}
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-white underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full py-3 bg-[#0aa8e6] hover:bg-[#0895c9] transition 
                   rounded-lg text-white font-semibold"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  </div>
);

}
