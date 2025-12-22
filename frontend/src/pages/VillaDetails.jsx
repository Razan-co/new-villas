import React, { useState, useRef, useEffect } from "react";  
import {
  ChevronLeft,
  ChevronRight,
  Car,
  Wifi,
  Snowflake,
  Tv,
  Wallet,
  Flame,
  Utensils,
  Plug,
  Brush
} from "lucide-react";
import { gsap } from "gsap";

export default function VillaDetails() {
  const images = ["/image10.png", "/image11.png", "/image12.png", "/image13.png", "/image14.png"];
  const [index, setIndex] = useState(0);

  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const animating = useRef(false);
  const timerRef = useRef(null);

  // Preload images to prevent flash
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-slide every 2 seconds
  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, [index]);

  const startAuto = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(slideNext, 2000);
  };

  const slideNext = () => {
    if (animating.current) return;
    animating.current = true;

    const nextIndex = index === images.length - 1 ? 0 : index + 1;

    gsap.set(nextRef.current, {
      x: "100%",
      backgroundImage: `url(${images[nextIndex]})`,
    });

    gsap.to(currentRef.current, { x: "-100%", duration: 0.9, ease: "power2.inOut" });
    gsap.to(nextRef.current, {
      x: "0%",
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setIndex(nextIndex);
        gsap.set(currentRef.current, {
          x: "0%",
          backgroundImage: `url(${images[nextIndex]})`,
        });
        gsap.set(nextRef.current, { x: "100%" });
        animating.current = false;
      },
    });
  };

  const slidePrev = () => {
    if (animating.current) return;
    animating.current = true;

    const prevIndex = index === 0 ? images.length - 1 : index - 1;

    gsap.set(nextRef.current, {
      x: "-100%",
      backgroundImage: `url(${images[prevIndex]})`,
    });

    gsap.to(currentRef.current, { x: "100%", duration: 0.9, ease: "power2.inOut" });
    gsap.to(nextRef.current, {
      x: "0%",
      duration: 0.9,
      ease: "power2.inOut",
      onComplete: () => {
        setIndex(prevIndex);
        gsap.set(currentRef.current, {
          x: "0%",
          backgroundImage: `url(${images[prevIndex]})`,
        });
        gsap.set(nextRef.current, { x: "-100%" });
        animating.current = false;
      },
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
        {/* CURRENT IMAGE */}
        <div
          ref={currentRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />

        {/* NEXT IMAGE */}
        <div
          ref={nextRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
        />

        <div className="absolute inset-0 bg-black/30" />

        {/* CONTROLS */}
        <button
          onClick={slidePrev}
          className="absolute bottom-10 left-6 md:left-10 z-30 bg-[#7ba9a7] p-5 rounded-full"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          onClick={slideNext}
          className="absolute bottom-10 right-6 md:right-10 z-30 bg-[#7ba9a7] p-5 rounded-full"
        >
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* DETAILS SECTION */}
      <section data-scroll-section className="px-5 md:px-20 py-10 bg-black text-white">
        <h1 className="text-3xl font-bold">Townhouse Villa</h1>
        <p className="text-gray-300 text-xl mt-1">Near AGS Resort, Yelagiri Hills, Tirpathur District.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 text-md md:text-xl gap-y-4 gap-x-6 mt-7 text-gray-200">
          <div className="flex items-center gap-2"><Car size={18} /> Parking facility</div>
          <div className="flex items-center gap-2"><Wifi size={18} /> Free Wifi</div>
          <div className="flex items-center gap-2"><Snowflake size={18} /> AC</div>
          <div className="flex items-center gap-2"><Utensils size={18} /> Kitchen</div>
          <div className="flex items-center gap-2"><Plug size={18} /> Power Backup</div>
          <div className="flex items-center gap-2"><Flame size={18} /> Geyser</div>
          <div className="flex items-center gap-2"><Wallet size={18} /> Card payment</div>
          <div className="flex items-center gap-2"><Tv size={18} /> TV</div>
          <div className="flex items-center gap-2"><Brush size={18} /> Daily Housekeeping</div>
        </div>

        <div className="mt-8">
          <div className="flex items-end gap-4">
            <p className="text-3xl font-bold">₹15000</p>
            <p className="text-gray-400 text-xl line-through">₹20000</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-3">About this Villa</h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Villa’s are designed around the lifestyle and expectations of modern travelers. Every aspect – from the interiors and amenities to the booking experience – has been thoughtfully crafted to offer comfort, convenience, style, and value. In these villa there are 3 bedrooms, kitchen, 3 bathrooms, peaceful balcony, and hall with super interior.
          </p>
        </div>
      </section>
    </>
  );
}
