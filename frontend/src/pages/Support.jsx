import React from "react";

export default function Support() {
  return (
    <div data-scroll-section className="min-h-screen bg-black text-white mt-10 px-6 md:px-16 pt-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
          Support
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="leading-relaxed text-gray-300 text-lg">
       At Classy Villa, we are committed to providing exceptional support to ensure your villa experience is seamless and enjoyable.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">1 Our Support Services Include:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Booking Assistance: Guidance through villa selection, availability, and reservations.</li>
            <li>Guest Inquiries: Answering questions about amenities, villa policies, and local information.</li>
            <li>Problem Resolution: Immediate assistance for any issues during your stay.</li>
            <li>Feedback: We welcome your suggestions to continuously improve our services.</li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">2 Contact Us:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Our dedicated support team is available via email, phone, or live chat. We strive to respond promptly and provide solutions to make your stay comfortable and stress-free.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
