import React, { useState, useEffect } from "react";
import { useContactStore } from "../store/useContactStore";
import toast from "react-hot-toast";

export default function ContactUs() {
  const { loading, error, success, sendMessage, resetStatus } =
    useContactStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // SHOW TOAST AFTER SUBMIT
  useEffect(() => {
    if (success) {
      toast.success("Your message has been sent!");

      // Reset state + clear form
      resetStatus();
      setForm({ name: "", email: "", message: "" });
    }

    if (error) {
      toast.error(error);
      resetStatus();
    }
  }, [success, error, resetStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(form);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div data-scroll-section className="min-h-screen bg-black text-white px-6 mt-10 pt-20 flex justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <label className="block mb-2 text-lg">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-500 py-3 px-4 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-2 text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-500 py-3 px-4 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block mb-2 text-lg">Message</label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-500 py-3 px-4 focus:outline-none focus:border-cyan-400 resize-none"
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-10 py-3 rounded-xl transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
