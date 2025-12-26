import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBookingStore } from "../store/bookingStore";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function BookingForm() {
  const navigate = useNavigate();
  const {
    fetchAvailability,
    createBooking,
    loading,
    error,
    bookedDates,
  } = useBookingStore();

  // ✅ Prices
  const WEEKDAY_PRICE = 15000; // Mon–Thu
  const WEEKEND_PRICE = 20000; // Fri–Sun

  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    days: "",
    price: 0,
    fullName: "",
    email: "",
    persons: 1,
    address: "",
    phone: "",
    villaId: "villa-1",
  });

  // ✅ Fetch availability
  useEffect(() => {
    fetchAvailability();
  }, []);

  // ✅ Auto-calc days & price (UPDATED LOGIC ONLY)
  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const diff = dayjs(form.checkOut).diff(dayjs(form.checkIn), "day");

      if (diff > 0) {
        let totalPrice = 0;
        let current = dayjs(form.checkIn);

        while (current.isBefore(dayjs(form.checkOut))) {
          const day = current.day(); // 0=Sun, 1=Mon ... 6=Sat

          if (day >= 1 && day <= 4) {
            totalPrice += WEEKDAY_PRICE; // Mon–Thu
          } else {
            totalPrice += WEEKEND_PRICE; // Fri–Sun
          }

          current = current.add(1, "day");
        }

        setForm((prev) => ({
          ...prev,
          days: String(diff),
          price: totalPrice,
        }));
      }
    }
  }, [form.checkIn, form.checkOut]);

  // ✅ Check if date is booked
  const isDateBooked = (date) => {
    return bookedDates.some((booking) => {
      const bookingStart = dayjs(booking.checkIn);
      const bookingEnd = dayjs(booking.checkOut);
      const checkDate = dayjs(date);
      return (
        checkDate.isAfter(bookingStart) &&
        checkDate.isBefore(bookingEnd)
      );
    });
  };

  const excludeBookedDates = (date) => !isDateBooked(date);

  // ❗ Kept unchanged (manual days × weekday price)
  const handleDaysChange = (e) => {
    const days = Number(e.target.value || 0);
    setForm((prev) => ({
      ...prev,
      days: e.target.value,
      price: days * WEEKDAY_PRICE,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation (unchanged)
  const validate = () => {
    if (!form.checkIn || !form.checkOut) {
      toast.error("Please choose check-in and check-out dates.");
      return false;
    }

    if (dayjs(form.checkOut).isSameOrBefore(dayjs(form.checkIn))) {
      toast.error("Check-out must be after check-in.");
      return false;
    }

    if (!form.fullName.trim()) {
      toast.error("Full name is required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Invalid email.");
      return false;
    }

    if (form.address.trim().length < 5) {
      toast.error("Enter a valid address.");
      return false;
    }

    if (!form.phone || form.phone.length < 10) {
      toast.error("Enter a valid phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ PAYLOAD UNCHANGED
    const payload = {
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      days: Number(form.days),
      price: form.price,
      fullName: form.fullName,
      email: form.email,
      persons: form.persons,
      address: form.address,
      phone: form.phone,
      villaId: form.villaId,
    };

    try {
      const newBooking = await createBooking(payload);
      toast.success("Booking successful!");
      navigate(`/booking-success/${newBooking._id}`);
    } catch (err) {
      toast.error(err.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white mt-10 py-20 px-4 md:px-12">
      {/* Banner */}
      <div className="max-w-5xl mx-auto mb-20">
        <img
          src="home4.png"
          alt="Villa"
          className="w-full h-[550px] object-cover rounded-lg opacity-80"
        />
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-bold mb-14">
          Villa Booking Form
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ✅ DATE PICKERS - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Check In */}
            <div className="space-y-2">
              <label className="block font-semibold text-sm">Check In</label>
              <div className="relative">
                <DatePicker
                  selected={form.checkIn ? new Date(form.checkIn) : null}
                  onChange={(date) => {
                    if (date) {
                      setForm((prev) => ({ ...prev, checkIn: dayjs(date).format("YYYY-MM-DD") }));
                    }
                  }}
                  minDate={new Date()}
                  filterDate={excludeBookedDates}
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white text-sm focus:border-[#0aa8e6] focus:outline-none"
                  placeholderText="Select check-in date"
                  calendarClassName="bg-black text-white border-gray-600"
                  dayClassName={(date) =>
                    isDateBooked(date)
                      ? "text-gray-500 bg-gray-800/50 cursor-not-allowed"
                      : "hover:bg-[#0aa8e6]/20"
                  }
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Check Out */}
            <div className="space-y-2">
              <label className="block font-semibold text-sm">Check Out</label>
              <div className="relative">
                <DatePicker
                  selected={form.checkOut ? new Date(form.checkOut) : null}
                  onChange={(date) => {
                    if (date) {
                      setForm((prev) => ({ ...prev, checkOut: dayjs(date).format("YYYY-MM-DD") }));
                    }
                  }}
                  minDate={
                    form.checkIn
                      ? new Date(new Date(form.checkIn).getTime() + 24 * 60 * 60 * 1000)
                      : new Date()
                  }
                  filterDate={excludeBookedDates}
                  dateFormat="dd/MM/yyyy"
                  className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white text-sm focus:border-[#0aa8e6] focus:outline-none"
                  placeholderText="Select check-out date"
                  calendarClassName="bg-black text-white border-gray-600"
                  dayClassName={(date) =>
                    isDateBooked(date)
                      ? "text-gray-500 bg-gray-800/50 cursor-not-allowed"
                      : "hover:bg-[#0aa8e6]/20"
                  }
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Days */}
            <div className="space-y-2">
              <label className="block font-semibold text-sm">Days</label>
              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleDaysChange}
                min="1"
                className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white text-sm focus:border-[#0aa8e6]"
                placeholder="Days"
              />
            </div>
          </div>

          {/* Full Name + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white focus:border-[#0aa8e6]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Total Price</label>
              <input
                type="text"
                value={`₹ ${form.price.toLocaleString()}`}
                readOnly
                className="w-full bg-gray-900 border border-gray-400 px-4 py-3 rounded-lg text-[#0aa8e6] font-bold cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email + Persons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white focus:border-[#0aa8e6]"
                placeholder="you@example.com"
              />
            </div>

          <div>
  <label className="block font-semibold mb-2">
    Number of Persons
  </label>

  <div className="flex items-center border border-gray-400 rounded-md overflow-hidden w-max">
    {/* Decrement */}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          persons: Math.max(1, prev.persons - 1),
        }))
      }
      className="px-5 py-3 bg-gray-700 text-white text-xl"
    >
      −
    </button>

    {/* Number */}
    <div className="flex-1 text-center bg-black text-white text-lg font-semibold w-[270px] md:min-w-[330px] py-3">
      {form.persons}
    </div>

    {/* Increment */}
    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          persons: Math.min(10, prev.persons + 1),
        }))
      }
      className="px-5 py-3 bg-gray-700 text-white text-xl"
    >
      +
    </button>
  </div>

  <p className="text-xs text-gray-400 mt-1">
    Maximum 10 persons
  </p>
</div>

          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white focus:border-[#0aa8e6]"
              placeholder="Your address"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              maxLength="15"
              className="w-full bg-transparent border border-gray-400 px-4 py-3 rounded-lg text-white focus:border-[#0aa8e6]"
              placeholder="10-digit phone number"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0aa8e6] hover:bg-[#0895c9] px-8 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 transition-all"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
