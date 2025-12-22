import React from "react";
import { MapPin, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <section className="w-full bg-black text-white py-10 md:py-16 px-4 md:px-20">

      {/* -------- TOP HEADING + PARAGRAPH (RIGHT SIDE) -------- */}
      <div className="max-w-8xl mx-auto mb-10 md:mb-20 text-center lg:text-right">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Where Tranquility Meets Timeless Luxury
        </h2>

        <p className="text-gray-300 leading-relaxed max-w-3xl ml-auto">
        Nestled along the serene stretches of Yelagiri, Classy Villa embodies the art of quiet sophistication. Each villa harmoniously blends contemporary architecture with natural serenity — a sanctuary crafted for the discerning few who value space, style, and privacy above all
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
              src="/image5.png"
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
  

  {/* Details BELOW BOTH columns */}
  <div className="text-gray-300 text-lg leading-relaxed mt-0 md:mt-10 text-center">
    <p>
     Living Room Interior <br />
    Comfort Meets Luxury Spacious  <br />
     living areas designed for relaxation, warmth, and everyday elegance. <br />
    </p>
  </div>

    

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

    {/* LEFT: Location + Price */}
   

    {/* RIGHT: Small Image */}
    <div className="relative w-fit mx-auto mt-10 md:mt-20 md:mx-0">

      {/* Frame top-right */}
      <div className="absolute -top-4 -right-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -top-4 -right-4 w-1 h-20 bg-[#8BB6B1]" />

      <img
        src="/image6.png"
        alt="Second Mansion"
        className="w-72 h-72 md:w-100 md:h-80 object-cover rounded-lg"
      />

      {/* Frame bottom-left */}
      <div className="absolute -bottom-4 -left-4 w-20 h-1 bg-[#8BB6B1]" />
      <div className="absolute -bottom-4 -left-4 w-1 h-20 bg-[#8BB6B1]" />
    </div>


     <div className="space-y-6 text-center mt-0 md:mt-40">

      <div className="flex items-center justify-center gap-3 text-gray-300">
        <MapPin className="w-6 h-6 text-[#8BB6B1]" />
        <span className="text-lg">Yelagiri Hills, Tirpathur District.</span>
      </div>
{/* 
      <div className="flex items-center justify-center gap-3 text-gray-300">
        <IndianRupee className="w-6 h-6 text-[#8BB6B1]" />
        <span className="text-lg">12 Cr. Onwards</span>
      </div> */}

        <div className="text-center mt-10">
        <a  href="https://www.google.com/maps?q=12.580024719238281,78.63467407226562&z=17&hl=en"
    target="_blank"
    rel="noopener noreferrer" className="bg-[#8BB6B1] text-black text-xl font-semibold px-10 py-3 rounded-xl hover:opacity-80 transition">
          Location
        </a>
      </div>

    </div>

  </div>
</div>
      </div>

    </section>
  );
}
