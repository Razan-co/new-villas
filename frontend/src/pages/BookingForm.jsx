import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { Calendar } from "lucide-react";
import { useBookingStore } from "../store/useBookingStore";

// Enable Day.js plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function BookingForm() {
  const navigate = useNavigate();

  const { createBooking, loading } = useBookingStore();

  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

const PRICE_PER_DAY = 15000;

const [form, setForm] = useState({
  checkIn: "",
  checkOut: "",
  days: "",
  price: 0,        // ✅ ADD THIS
  fullName: "",
  email: "",
   persons: 1, 
  address: "",
  phone: "",
  villaId: "villa-1",
});

  // Auto-calc days
useEffect(() => {
  if (form.checkIn && form.checkOut) {
    const diff = dayjs(form.checkOut).diff(dayjs(form.checkIn), "day");

    if (diff > 0) {
      const totalPrice = diff * PRICE_PER_DAY;

      setForm((prev) => ({
        ...prev,
        days: String(diff),
        price: totalPrice,   // ✅ AUTO PRICE UPDATE
      }));
    }
  }
}, [form.checkIn, form.checkOut]);

const handleChange = (e) => {
  const { name, value } = e.target;

  // ✅ Days → Auto price
  if (name === "days") {
    const totalPrice = Number(value || 0) * PRICE_PER_DAY;
    setForm((prev) => ({
      ...prev,
      days: value,
      price: totalPrice,
    }));
    return;
  }

  // ✅ Persons → Max 10 restriction
  if (name === "persons") {
    const personsValue = Math.min(10, Math.max(1, Number(value)));
    setForm((prev) => ({
      ...prev,
      persons: personsValue,
    }));
    return;
  }

  setForm((prev) => ({ ...prev, [name]: value }));
};


  // Validation
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

      // redirect to detail page using API _id
      navigate(`/booking-success/${newBooking._id}`);

    } catch (err) {
      toast.error(err.message || "Booking failed");
    }
  };

  return (
    <div data-scroll-section className="min-h-screen bg-black text-white mt-10 py-20 px-4 md:px-12">

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

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Check In */}
            <label className="space-y-2">
              <div className="font-semibold">Check In</div>

              <div className="relative">
                <input
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  onChange={handleChange}
                  ref={checkInRef}
                  min={dayjs().format("YYYY-MM-DD")}   // block past dates
                  className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white pr-12"
                />

                <button
                  type="button"
                  onClick={() => checkInRef.current.showPicker()}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Calendar size={20} className="text-gray-300" />
                </button>
              </div>
            </label>

            {/* Check Out */}
            <label className="space-y-2">
              <div className="font-semibold">Check Out</div>

              <div className="relative">
                <input
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  onChange={handleChange}
                  ref={checkOutRef}
                  min={
                    form.checkIn
                      ? dayjs(form.checkIn).add(1, "day").format("YYYY-MM-DD")
                      : dayjs().add(1, "day").format("YYYY-MM-DD")
                  }
                  className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white pr-12"
                />

                <button
                  type="button"
                  onClick={() => checkOutRef.current.showPicker()}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Calendar size={20} className="text-gray-300" />
                </button>
              </div>
            </label>

            {/* Days */}
            <label className="space-y-2">
              <div className="font-semibold">Days</div>
              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleChange}
                min="1"
                className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white"
                placeholder="Days"
              />
            </label>

          </div>

          {/* Full Name */}
       {/* Full Name + Price */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Full Name */}
  <div>
    <label className="block font-semibold mb-2">Full Name</label>
    <input
      type="text"
      name="fullName"
      value={form.fullName}
      onChange={handleChange}
      className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
      placeholder="Your full name"
    />
  </div>

  {/* ✅ AUTO PRICE (READ ONLY) */}
  <div>
    <label className="block font-semibold mb-2">Total Price</label>
    <input
      type="text"
      value={`₹ ${form.price.toLocaleString()}`}
      readOnly
      className="w-full bg-gray-900 border border-gray-400 px-3 py-3 rounded-sm text-[#0aa8e6] font-bold cursor-not-allowed"
    />
  </div>

</div>


          {/* Email */}
         {/* Email + Persons */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Email */}
  <div>
    <label className="block font-semibold mb-2">Email</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
      placeholder="you@example.com"
    />
  </div>

  {/* ✅ Number of Persons */}
  <div>
    <label className="block font-semibold mb-2">Number of Persons</label>
    <input
      type="number"
      name="persons"
      value={form.persons}
      onChange={handleChange}
      min="1"
      max="10"
      className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
    />
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
              onChange={handleChange}
              rows="3"
              className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
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
              onChange={handleChange}
              maxLength="15"
              className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
              placeholder="10-digit phone number"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0aa8e6] hover:bg-[#0895c9] px-6 py-3 rounded-md font-semibold"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


// // src/pages/BookingForm.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import dayjs from "dayjs";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import { Calendar } from "lucide-react";
// import { useBookingStore } from "../store/useBookingStore";

// // Enable Day.js plugins
// dayjs.extend(isSameOrBefore);
// dayjs.extend(isSameOrAfter);

// export default function BookingForm() {
//   const navigate = useNavigate();

//   const { createBooking, loading, error, success, resetStatus } = useBookingStore();

//   const checkInRef = useRef(null);
//   const checkOutRef = useRef(null);

//   const [form, setForm] = useState({
//     checkIn: "",
//     checkOut: "",
//     days: "",
//     fullName: "",
//     email: "",
//     address: "",
//     phone: "",
//     villaId: "villa-1",
//   });

//   // Auto-calc days
//   useEffect(() => {
//     if (form.checkIn && form.checkOut) {
//       const diff = dayjs(form.checkOut).diff(dayjs(form.checkIn), "day");
//       if (diff > 0) {
//         setForm((prev) => ({ ...prev, days: String(diff) }));
//       }
//     }
//   }, [form.checkIn, form.checkOut]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Validation
//   const validate = () => {
//     if (!form.checkIn || !form.checkOut) {
//       toast.error("Please choose check-in and check-out dates.");
//       return false;
//     }

//     if (dayjs(form.checkOut).isSameOrBefore(dayjs(form.checkIn))) {
//       toast.error("Check-out must be after check-in.");
//       return false;
//     }

//     if (!form.fullName.trim()) {
//       toast.error("Full name is required.");
//       return false;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//       toast.error("Invalid email.");
//       return false;
//     }

//     if (form.address.trim().length < 5) {
//       toast.error("Enter a valid address.");
//       return false;
//     }

//     if (!form.phone || form.phone.length < 10) {
//       toast.error("Enter a valid phone number.");
//       return false;
//     }

//     return true;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!validate()) return;

//   const payload = {
//     checkIn: form.checkIn,
//     checkOut: form.checkOut,
//     days: Number(form.days),
//     fullName: form.fullName,
//     email: form.email,
//     address: form.address,
//     phone: form.phone,
//     villaId: form.villaId,
//   };

//   try {
//     const booking = await createBooking(payload);
//     toast.success("Booking successful!");
//    navigate("/booking-success");

//   } catch (err) {
//     toast.error(err.message); // ⭐ show toast directly
//   }
// };



//   return (
//     <div data-scroll-section className="min-h-screen bg-black text-white mt-10 py-20 px-4 md:px-12">

//       {/* Banner */}
//       <div className="max-w-5xl mx-auto mb-8">
//         <img
//           src="home4.png"
//           alt="Villa"
//           className="w-full h-[550px] object-cover rounded-lg opacity-80"
//         />
//       </div>

//       {/* Booking Form */}
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-center text-3xl md:text-4xl font-bold mb-8">
//           Villa Booking Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* Dates */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//             {/* Check In */}
//             <label className="space-y-2">
//               <div className="font-semibold">Check In</div>

//               <div className="relative">
//               <input
//   type="date"
//   name="checkIn"
//   value={form.checkIn}
//   onChange={handleChange}
//   ref={checkInRef}
//   min={dayjs().add(0, "day").format("YYYY-MM-DD")}   // ⬅ BLOCK PAST DATES
//   className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white pr-12"
// />


//                 <button
//                   type="button"
//                   onClick={() => checkInRef.current.showPicker()}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   <Calendar size={20} className="text-gray-300" />
//                 </button>
//               </div>
//             </label>

//             {/* Check Out */}
//             <label className="space-y-2">
//               <div className="font-semibold">Check Out</div>

//               <div className="relative">
//               <input
//   type="date"
//   name="checkOut"
//   value={form.checkOut}
//   onChange={handleChange}
//   ref={checkOutRef}
//   min={
//     form.checkIn
//       ? dayjs(form.checkIn).add(1, "day").format("YYYY-MM-DD") // after check-in
//       : dayjs().add(2, "day").format("YYYY-MM-DD")              // default
//   }
//   className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white pr-12"
// />


//                 <button
//                   type="button"
//                   onClick={() => checkOutRef.current.showPicker()}
//                   className="absolute right-3 top-1/2 -translate-y-1/2"
//                 >
//                   <Calendar size={20} className="text-gray-300" />
//                 </button>
//               </div>
//             </label>

//             {/* Days */}
//             <label className="space-y-2">
//               <div className="font-semibold">Days</div>
//               <input
//                 type="number"
//                 name="days"
//                 value={form.days}
//                 onChange={handleChange}
//                 min="1"
//                 className="w-full bg-transparent border border-gray-400 px-3 py-2 rounded-sm text-white"
//                 placeholder="Days"
//               />
//             </label>

//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block font-semibold mb-2">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//               className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
//               placeholder="Your full name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block font-semibold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block font-semibold mb-2">Address</label>
//             <textarea
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               rows="3"
//               className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
//               placeholder="Your address"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block font-semibold mb-2">Phone</label>
//             <input
//               type="tel"
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               maxLength="15"
//               className="w-full bg-transparent border border-gray-400 px-3 py-3 rounded-sm text-white"
//               placeholder="10-digit phone number"
//             />
//           </div>

//           {/* Submit */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#0aa8e6] hover:bg-[#0895c9] px-6 py-3 rounded-md font-semibold"
//             >
//               {loading ? "Booking..." : "Book Now"}
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }
