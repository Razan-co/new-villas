import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function VillaGallery() {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const sliderRef = useRef(null);
  const fullscreenRef = useRef(null);
  const slideTween = useRef(null);

  const [fullscreenImg, setFullscreenImg] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const images = [
    "/image11.png",
    "/image6.png",
    "/image13.png",
    "/image3.png",
    "/image16.jpeg",
    "/bathroom.jpeg",
    "/image17.jpeg",
    "/image18.jpeg",
    "/image19.jpeg",
    "/image24.png",
    "/image8.png",
    "/image23.jpeg",
    "/image22.jpeg",
    "/image21.jpeg",
    "/image20.jpeg",
  ];

  /* HERO → GALLERY */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(heroRef.current, {
      opacity: 0,
      y: -200,
      duration: 1.8,
      delay: 1.5,
      ease: "power3.inOut",
      onComplete: () => (heroRef.current.style.display = "none"),
    });

    tl.set(galleryRef.current, { display: "block" });

    tl.to(galleryRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  /* HORIZONTAL AUTO SLIDE */
  useEffect(() => {
    slideTween.current = gsap.to(sliderRef.current, {
      xPercent: -50,
      duration: 30,
      ease: "linear",
      repeat: -1,
    });

    return () => slideTween.current?.kill();
  }, []);

  /* PAUSE ON HOVER */
  useEffect(() => {
    if (!slideTween.current) return;
    isHovering ? slideTween.current.pause() : slideTween.current.resume();
  }, [isHovering]);

  /* FULLSCREEN */
  const openFullscreen = (src) => {
    setFullscreenImg(src);
    setTimeout(() => {
      gsap.fromTo(
        fullscreenRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
    }, 10);
  };

  const closeFullscreen = () => {
    gsap.to(fullscreenRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => setFullscreenImg(null),
    });
  };

  return (
    <div className="w-full bg-black min-h-screen overflow-hidden">
      {/* HERO */}
      <div
        ref={heroRef}
        className="relative w-full h-[70vh] md:h-screen flex items-center justify-center"
      >
        <img src="/image15.png" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Classy Villa
          </h1>
          <p className="text-white max-w-2xl">
            A villa that blends style, space, and sophistication.
          </p>
        </div>
      </div>

      {/* HORIZONTAL AUTO SLIDER */}
      <div
        ref={galleryRef}
        className="hidden opacity-0 translate-y-20 b-12 pt-30"
      >
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="overflow-hidden"
        >
          <div
            ref={sliderRef}
            className="flex gap-6 w-max px-6"
          >
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="relative group min-w-[280px] md:min-w-[420px] h-72 md:h-96 rounded-xl overflow-hidden"
              >
                <img
                  src={src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* VIEW BUTTON */}
                <div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center
                             opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                >
                  <button
                    onClick={() => openFullscreen(src)}
                    className="px-6 py-2 bg-white text-black font-semibold rounded-md"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
{/* mid content */}

<div className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
  <div className="max-w-8xl mx-auto space-y-10">

    {/* TITLE */}
    <h1 className="text-3xl md:text-4xl font-bold">
      Classy Villa – Yelagiri
    </h1>

    {/* INTRO */}
    <p className="leading-relaxed text-gray-300 text-lg">
      Welcome to Classy Villa, Yelagiri. The following information outlines the
      amenities, house rules, booking policies, and stay guidelines for all
      guests. By booking with us, you agree to comply with these terms.
    </p>

    {/* SECTION 1 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        1 Tariff Details:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Weekdays(Monday - Thursday): ₹15,000 /- per night</li>
        <li>Weekends(Friday, Saturday & Sunday): ₹20,000 /- per night</li>
      </ul>
    </div>

    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        2 Amenities Provided:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Private kitchen for guest use</li>
        <li>Complimentary parking facility</li>
        <li>Free Wi-Fi access</li>
        <li>Air-conditioned rooms</li>
        <li>Television</li>
        <li>Washing machine</li>
      </ul>
    </div>

    {/* SECTION 2 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        3 Property Rules:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Bachelors are not permitted</li>
        <li>
          Valid government-issued identification is mandatory (Passport,
          Aadhaar Card, or Driving License)
        </li>
        <li>
          Smoking, alcohol consumption, and consumption of pork are strictly
          prohibited
        </li>
        <li>Pets are not allowed on the premises</li>
        <li>Parties, gatherings, or commercial events are not permitted</li>
        <li>Guests are expected to respect property rules, neighbors, and local laws.</li>
        <li>Noise levels should be kept reasonable, especially during night hours.</li>
        <li>Guests are responsible for maintaining the villa and its amenities in good condition, Any damage or loss caused during the stay will be charged to the guest.</li>
      </ul>
    </div>

    {/* SECTION 3 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        4 Food and Dining Policy:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Vegetarian and non-vegetarian food is permitted</li>
        <li>Consumption of pork is not allowed</li>
        <li>Private kitchen available for self-cooking</li>
      </ul>
    </div>

    {/* SECTION 4 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        5 Kitchen Facilities:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Stovetop</li>
        <li>Oven</li>
        <li>Induction stove</li>
        <li>Refrigerator</li>
        <li>Basic kitchen utensils and cookware</li>
      </ul>
    </div>

    {/* SECTION 5 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        6 Bedrooms and Accommodation:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Spacious air-conditioned bedrooms with attached bathrooms</li>
        <li>Bathtub available in attached bathrooms</li>
        <li>Extra beds available upon request</li>
        <li>Maximum occupancy is limited to 10 guests</li>
      </ul>
    </div>

    {/* SECTION 6 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        7 Check-In and Check-Out Policy:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Check-in time is 2:00 PM and Check out at 11 am</li>
        <li>Guests must inform their arrival time in advance</li>
        <li>Check-out is flexible; guests are requested to inform at least 2 hours prior to departure</li>
      </ul>
    </div>

    {/* SECTION 7 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        8 Refund and Cancellation Policy:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Cancellation is allowed within 24 hours of booking</li>
        <li>No refunds will be issued after 24 hours from booking time</li>
      </ul>
    </div>

    {/* SECTION 8 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        9 Advance Booking and Payment:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>An advance payment of ₹10,000 is required at the time of booking</li>
        <li>Accepted modes of payment include Google Pay and bank transfer</li>
      </ul>
    </div>

    {/* SECTION 9 */}
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        10 Sight seeing details:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>Boat house - 6 min (1.8 km)</li>
        <li>Yelagiri nature park - 5 min (1.5 km)</li>
        <li>A R Thanga kottai - 8 min - (1.7 km)</li>
        <li>Thrill Valley - 12 min  (3.2 km)</li>
        <li>Skyraa Entertainment - 9 min (3.2 km)</li>
        <li>Fundera Birds park - 12 min (2.8 km)</li>
        <li>Selfie Panda - 9 min   (3.4 km)</li>
        <li>View point - 4 min (1.0 km)</li>
        <li>AGS Wonder World - 12 min  (4.9 km)</li>
        <li>Swami Malai Hills - 16 min  (5.5 km)</li>
        <li>Jalagamparai Waterfalls - 5 min (1.2 km)</li>
        <li>Mountain View  Adventure - 12 min (2.6 km)</li>
      </ul>
    </div>
    <div className="space-y-3">
      <h2 className="text-xl md:text-2xl font-semibold">
        11 Contact Information:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        <li>For enquiries and bookings, please contact:</li>
        <li>WhatsApp / Call: 9840942784, 9003723648</li>
      </ul>
    </div>

  </div>
</div>

      {/* FULLSCREEN */}
      {fullscreenImg && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center"
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white text-2xl font-bold"
          >
            ✕
          </button>

          <img
            src={fullscreenImg}
            className="w-[90%] md:w-[70%] lg:w-[55%] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
