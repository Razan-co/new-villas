import React from "react";
import { MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

export default function MansionShowcase() {
  return (
    <section className="w-full bg-black text-white py-16 px-4 md:px-20">

      {/* -------- TOP HEADING + PARAGRAPH (RIGHT SIDE) -------- */}
      <div className="max-w-8xl mx-auto mb-10 md:mb-20 text-center lg:text-right">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Where Architectural Grace Meets Serene Living
        </h2>

        <p className="text-gray-300 leading-relaxed max-w-3xl ml-auto">
          Classy Villa is the embodiment of refined elegance — a collection of 
          contemporary luxury villa crafted for families who value privacy, warmth, 
          and timeless design. Each villa is an architectural masterpiece that blends 
          space, natural light, and sophistication to create a sanctuary of comfort 
          and exclusivity.
        </p>
      </div>

      {/* -------- MAIN TWO COLUMN GRID -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">

        {/* -------- LEFT SIDE BIG IMAGE -------- */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-fit">

            {/* Frame top-left */}
            <div className="absolute -top-4 -left-4 w-20 h-1 bg-[#8BB6B1]" />
            <div className="absolute -top-4 -left-4 w-1 h-20 bg-[#8BB6B1]" />

            <img
              src="/image4.png"
              alt="Main Mansion"
              className="w-80 h-80 md:w-[550px] md:h-[660px] object-cover rounded-lg"
            />

            {/* Frame bottom-right */}
            <div className="absolute -bottom-4 -right-4 w-20 h-1 bg-[#8BB6B1]" />
            <div className="absolute -bottom-4 -right-4 w-1 h-20 bg-[#8BB6B1]" />
          </div>
        </div>

        {/* -------- RIGHT SIDE STACKED CONTENT -------- */}
     {/* -------- RIGHT SIDE TWO COLUMNS + PARAGRAPH -------- */}
<div className="w-full">

  {/* Two-column layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

    {/* LEFT: Location + Price */}
    <div className="space-y-6 text-center mt-0 md:mt-30">

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
      <div className="flex items-center justify-center text-center mt-10">
        <Link to={"/detail"} className="bg-[#8BB6B1] text-black text-xl font-semibold px-10 py-3 rounded-xl hover:opacity-80 transition">
          View Mansion
        </Link>
      </div>
      {/* <div className="flex items-center gap-3 text-gray-300">
        <IndianRupee className="w-6 h-6 text-[#8BB6B1]" />
        <span className="text-lg">12 Cr. Onwards</span>
      </div> */}

    </div>

    {/* RIGHT: Small Image */}
    <div className="relative w-fit mx-auto md:mx-0">

      {/* Frame top-right */}
      <div className="absolute -top-4 -right-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -top-4 -right-4 w-1 h-20 bg-[#8BB6B1]" />

      <img
        src="/image3.png"
        alt="Second Mansion"
        className="w-72 h-72 md:w-100 md:h-80 object-cover rounded-lg"
      />

      {/* Frame bottom-left */}
      <div className="absolute -bottom-4 -left-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -bottom-4 -left-4 w-1 h-20 bg-[#8BB6B1]" />
    </div>

  </div>

  {/* Details BELOW BOTH columns */}
  <div className="text-gray-300 text-lg leading-relaxed mt-10 md:mt-20 text-center">
    <p>
     Entrance | Staircase | Architecture<br />
     Elegant Architectural Details <br />
      A refined entrance with modern lighting and clean lines that reflect timeless design. <br />
    </p>
  </div>

    
</div>
      </div>

    </section>
  );
}
