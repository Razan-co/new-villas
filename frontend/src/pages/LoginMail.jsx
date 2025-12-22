import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LoginMail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    try {
      await login({ email, password });
      navigate("/book");
    } catch (err) {
      // error already handled in store
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 
                   text-white bg-black/50 backdrop-blur-sm p-3
                   rounded-full hover:bg-black/70 transition-all md:top-8 md:left-8"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Background Image */}
      <img
        src="/login.png"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-sm bg-black/40 backdrop-blur-xl rounded-2xl p-6 shadow-2xl text-center 
                      border border-white/20 sm:p-8 sm:max-w-md">
        <h2 className="text-2xl font-bold text-white mb-5 sm:text-3xl">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400 text-red-100 rounded-xl text-xs sm:text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2 sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white 
                         placeholder-gray-300 outline-none text-sm border border-white/30
                         focus:border-[#0aa8e6]/50 transition-all sm:text-base sm:py-3"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-200 text-sm font-medium mb-2 sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white 
                         placeholder-gray-300 outline-none text-sm border border-white/30
                         focus:border-[#0aa8e6]/50 transition-all sm:text-base sm:py-3"
              placeholder="••••••••"
            />
          </div>

          <p className="text-gray-300 text-xs sm:text-sm mb-5">
            By continuing, I agree to{" "}
            <span className="font-semibold text-white">Terms</span> &{" "}
            <span className="font-semibold text-white">Privacy</span>
          </p>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#0aa8e6] hover:bg-[#0895c9] transition-all rounded-xl 
                       text-white font-semibold text-sm disabled:opacity-50 sm:py-3 sm:text-base"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-gray-300 text-xs sm:text-sm">
            Don't have an account?{" "}
            <Link to={"/signup"}
              className="font-semibold text-white hover:text-[#0aa8e6] transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
