import React from "react";

export default function AboutPage() {
  return (
    <div   data-scroll-section className="bg-black text-white px-6 md:px-20 py-24">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-10">About US</h1>

      {/* MAIN ROW */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* LEFT TEXT */}
        <p className="text-gray-300 text-lg leading-relaxed md:w-2/3 mt-0 md:mt-20">
         Our journey began with a vision to create a villa that offers timeless design, functional layouts, and a tranquil lifestyle. From architecture to interiors, every element is curated to provide spacious living, abundant natural light, and seamless indoor-outdoor flow. We focus on craftsmanship, premium materials, and thoughtful planning to ensure lasting value and elegance.
        </p>

        {/* RIGHT CIRCLE IMAGE */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/about.png"  /* Change to your image */
            className="w-72 h-72 md:w-90 md:h-90 object-cover rounded-full border border-gray-600"
            alt="About"
          />
        </div>
      </div>

      {/* BOTTOM PARAGRAPH */}
      <p className="text-gray-300 text-lg leading-relaxed mt-16 max-w-8xl">
        Our commitment is simple: to provide our clients with an unforgettable
        villa experience where elegance meets ease. From the moment you book
        until your departure, our dedicated team ensures every detail is taken
        care of, so you can relax, unwind, and enjoy the finer things in life.
      </p>
    </div>
  );
}
