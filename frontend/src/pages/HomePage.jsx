import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import VillaShowcase from "../components/VillaShowcase";
import MansionShowcase from "../components/MansionShowcase";
import Contact from "../components/Contact";
import LastOne from "../components/LastOne";

export default function HomePage() {
  const images = [
    "/image11.png",
    "/image8.png",
    "/image3.png",
    "/image7.png",
    "/image23.jpeg",
  ];

  const [index, setIndex] = useState(0);

  const currentRef = useRef(null);
  const nextRef = useRef(null);
  const timerRef = useRef(null);
  const animating = useRef(false);

  /* PRELOAD */
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  /* AUTO FADE */
  useEffect(() => {
    timerRef.current = setInterval(fadeNext, 1500);
    return () => clearInterval(timerRef.current);
  }, [index]);

  const fadeNext = () => {
    if (animating.current) return;
    animating.current = true;

    const nextIndex = (index + 1) % images.length;

    gsap.set(nextRef.current, {
      opacity: 0,
      backgroundImage: `url(${images[nextIndex]})`,
      zIndex: 2,
    });

    gsap.set(currentRef.current, { zIndex: 1 });

    gsap.to(nextRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        // swap image silently
        gsap.set(currentRef.current, {
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: 1,
        });

        gsap.set(nextRef.current, {
          opacity: 0,
        });

        setIndex(nextIndex);
        animating.current = false;
      },
    });
  };

  return (
    <>
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
      {/* CURRENT IMAGE */}
      <div
        ref={currentRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${images[index]})` }}
      />

      {/* NEXT IMAGE (FADE LAYER) */}
      <div
        ref={nextRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-0"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* TEXT */}
     <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
    <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
      Classy Villa
    </h1>
    {/* <p className="text-white max-w-4xl text-md md:text-xl">
      Classy Villa offers exclusive villa stays designed for travelers who value
      space, privacy, and sophistication. From peaceful mornings to indulgent
      evenings, every detail is curated to ensure comfort, elegance, and
      unforgettable moments.
    </p> */}
  </div>
    </section>

      {/* COMPONENT SECTIONS */}
      <section>
        <VillaShowcase />
      </section>

      <section>
        <MansionShowcase />
      </section>

      <section>
        <Contact />
      </section>

      <section>
        <LastOne />
      </section>

    </>
  );
}

