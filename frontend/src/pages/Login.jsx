import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function Login() {
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");

  const { requestLoginOtp, loading } = useAuthStore();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.length !== 10) return alert("Enter a valid mobile number");

    await requestLoginOtp(mobile, fullName || "User");
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-[90%] max-w-md bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-lg text-center">

        <h2 className="text-3xl font-semibold text-white mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-200 text-lg font-medium mb-2">
            Enter Your Mobile Number
          </label>

          {/* Mobile Input Box */}
          <div className="flex items-center gap-3 justify-center bg-white/20 px-4 py-3 rounded-lg w-full mb-5">
            <span className="text-white font-semibold">+91</span>
            <input
              type="tel"
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.slice(0, 10))}
              className="bg-transparent outline-none text-white placeholder-gray-300 flex-1"
              placeholder="Mobile Number"
            />
          </div>

          {/* Full Name (Optional) */}
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your Name (Optional)"
            className="w-full mb-5 px-4 py-3 rounded-lg bg-white/20 text-white 
                       placeholder-gray-300 outline-none"
          />

          {/* Terms */}
          <p className="text-gray-300 text-sm mb-6">
            By continuing, I agree to{" "}
            <span className="font-semibold text-white">Terms of use</span> &
            <span className="font-semibold text-white"> Privacy Policy</span>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#0aa8e6] hover:bg-[#0895c9] transition rounded-lg 
                       text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Get OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
