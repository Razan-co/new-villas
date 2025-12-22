import React from "react";
import { MapPin, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function LastOne() {
    const navigate = useNavigate();
  const {isAuthenticated} = useAuthStore();

   const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/login"); // redirect to login
    } else {
      navigate("/book"); // user logged in → go to villa detail page
    }
  };


  return (
    <section className="w-full bg-black text-white py-10 md:py-16 px-4 md:px-20">

      {/* -------- TOP HEADING + PARAGRAPH (RIGHT SIDE) -------- */}
      <div className="max-w-8xl mx-auto mb-10 md:mb-20 text-center lg:text-right">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Legacy Living, Elevated to Modern Mastery
        </h2>

        <p className="text-gray-300 leading-relaxed max-w-3xl ml-auto">
       At Classy Villa, timeless charm is reimagined through contemporary craftsmanship. Each residence reflects a perfect blend of heritage elegance and modern sophistication — designed for Chennai’s most discerning families who appreciate artistry, comfort, and legacy living.
        </p>
      </div>

      {/* -------- MAIN TWO COLUMN GRID -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">

     {/* -------- RIGHT SIDE TWO COLUMNS + PARAGRAPH -------- */}
<div className="w-full ">

  {/* Two-column layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

    {/* RIGHT: Small Image */}
    <div className="relative w-fit mx-auto mt-0 md:mt-20 md:mx-0 order-1 md:order-2">

      {/* Frame top-right */}
      <div className="absolute -top-4 -right-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -top-4 -right-4 w-1 h-20 bg-[#8BB6B1]" />

      <img
        src="/image8.png"
        alt="Second Mansion"
        className="w-72 h-72 md:w-100 md:h-80 object-cover rounded-lg"
      />

      {/* Frame bottom-left */}
      <div className="absolute -bottom-4 -left-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -bottom-4 -left-4 w-1 h-20 bg-[#8BB6B1]" />
    </div>
    {/* LEFT: Location + Price */}
    <div className="space-y-6 text-center mt-0 md:mt-40 order-1 md:order-2">

      <div className="flex items-center justify-center gap-3 text-gray-300">
      <MapPin className="w-6 h-6 text-[#8BB6B1]" />
      <a
        href="https://www.google.com/maps?q=12.580024719238281,78.63467407226562&z=17&hl=en"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg hover:underline"
      >
        Yelagiri Hills, Tirpathur District.
      </a>
    </div>

      <div className="text-center mt-10">
        <button
          onClick={handleBookNow}
          className="bg-[#8BB6B1] text-black text-xl font-semibold px-10 py-3 rounded-xl hover:opacity-80 transition"
        >
          Book Now
        </button>
      </div>
    </div>

  </div>

  {/* Details BELOW BOTH columns */}
  <div className="text-gray-300 text-lg leading-relaxed mt-10 text-center order-3">
    <p>
       Overall Property | Lifestyle Section <br />

     A Home Designed for Living<br />
     A perfect balance of privacy, comfort, and contemporary luxury for modern families. <br />
    </p>
  </div>

</div>



  <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-fit">

            {/* Frame top-left */}
            <div className="absolute -top-4 -left-4 w-20 h-1 bg-[#8BB6B1]" />
            <div className="absolute -top-4 -left-4 w-1 h-20 bg-[#8BB6B1]" />

            <img
              src="/image7.png"
              alt="Main Mansion"
              className="w-80 h-80 md:w-[550px] md:h-[660px] object-cover rounded-lg"
            />

            {/* Frame bottom-right */}
            <div className="absolute -bottom-4 -right-4 w-20 h-1 bg-[#8BB6B1]" />
            <div className="absolute -bottom-4 -right-4 w-1 h-20 bg-[#8BB6B1]" />
          </div>
        </div>
      </div>

    </section>
  );
}
