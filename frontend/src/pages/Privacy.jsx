import React from "react";

export default function Privacy() {
  return (
    <div data-scroll-section className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
          Privacy and policy
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="leading-relaxed text-gray-300 text-lg">
        We collect personal information such as name, email, phone number, payment details, and special requests to provide and improve our services.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">1 Use of Information:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>To process bookings, send confirmations, and communicate essential updates.</li>
            <li>To improve our services, marketing (only if opted in), and personalize guest experiences.</li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">2 Data Security:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Personal data is stored securely and protected against unauthorized access.</li>
            <li>Payment information is processed through secure third-party gateways.</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">3 How to Apply:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
           Information is never sold to third parties.
            </li>
            <li>
          Limited sharing may occur with service providers necessary for your booking (e.g., housekeeping, villa management).
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">4 Your Rights:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
         Guests can request access or correction of personal data at any time but deletion request will only be done at the time of check out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
