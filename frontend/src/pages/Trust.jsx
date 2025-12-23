import React from "react";

export default function Trust() {
  return (
    <div data-scroll-section className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
        Trust and Safety Policy
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="leading-relaxed text-gray-300 text-lg">
        At Classy Villa, your safety and peace of mind are our top priorities. Our villa is carefully verified to meet high standards of security, hygiene, and comfort. We ensure that your stay is safe, secure, and worry-free.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">1 Guest Safety:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Our villa listed are verified for safety, hygiene, and legal compliance.</li>
            <li>Safety features such as fire extinguishers, smoke detectors, and first-aid kits are provided where applicable.</li>
          </ul>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">2 Payment Security:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Payments are processed securely using encrypted gateways to prevent fraud.</li>
            <li>We do not store sensitive payment data on our servers.</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">3 Responsible Hosting:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
         Our team regularly inspects villa to ensure standards of cleanliness, safety, and comfort.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">4 Reporting Issues:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
    Guests are encouraged to report any safety concerns or policy violations immediately.
            </li>
            <li>
 Prompt action will be taken to resolve any safety or security issues.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
