import React from "react";

export default function Guest() {
  return (
    <div data-scroll-section className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
         Guest Policies
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="leading-relaxed text-gray-300 text-lg">
        Our Guest Policies are designed to make your stay enjoyable, comfortable, and hassle-free. They outline check-in and check-out procedures, villa use guidelines, and expectations for a pleasant experience for all guests.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">1 Check-in and Check-out:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Standard check-in: 2:00 PM | Standard check-out: 11:00 AM (subject to villa policy).</li>
            <li>Early check-in or late check-out may be requested in advance and may incur additional charges.</li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">2 CancOccupancy:ellation and Refunds:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Only registered guests are allowed on the property. Maximum occupancy limits apply.</li>
            <li>Extra guests must be declared and may incur additional fees.</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">3 Conduct:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
         Guests are expected to respect property rules, neighbors, and local laws.
            </li>
            <li>
         Noise levels should be kept reasonable, especially during night hours.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">4 Property Use:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
        Villa must be used for residential purposes only.
            </li>
            <li>
        Any damage or excessive cleaning required will be charged to the guest.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
