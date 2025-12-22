import React from "react";

export default function TeamsAndCareers() {
  return (
    <div data-scroll-section className="min-h-screen bg-black text-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
          Teams and Careers
        </h1>

        {/* INTRO PARAGRAPH */}
        <p className="leading-relaxed text-gray-300 text-lg">
          At Classy Villa, we believe that exceptional service begins with an 
          exceptional team. Our people are the heart of our business, dedicated 
          to delivering luxury experiences with care, professionalism, and attention 
          to detail.
        </p>

        {/* SECTION 1 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">1 Careers:</h2>
          <p className="text-gray-300 leading-relaxed">
            We are always looking for talented, passionate individuals to join our 
            growing family. Whether in hospitality, property management, marketing, 
            or customer experience, we offer opportunities to build a rewarding career 
            in the luxury travel industry.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">2 Why Work With Us:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Collaborative and supportive work environment</li>
            <li>Opportunities for growth and professional development</li>
            <li>Exposure to luxury hospitality and international clientele</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">3 How to Apply:</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              If you are passionate about hospitality and creating memorable
              experiences, please submit your resume and cover letter through our
              careers page. We look forward to welcoming dedicated professionals
              to our team.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
