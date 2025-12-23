import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10 px-6 md:px-16">

      {/* GRID */}
      <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

        {/* LOGO */}
      <div className="flex flex-col items-start md:items-center gap-4">
  <img
    src="/logo.png"
    alt="Classy Villas Logo"
    className="w-24 h-20 rounded-full"
  />

 <a
  href="https://www.instagram.com/classy.villa?igsh=MWp3Yzg0cnlzdDNneA=="
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-gray-300 hover:text-pink-500 transition"
>
  <FaInstagram className="w-6 h-6" />
  <span className=" md:inline">@classyvilla</span>
</a>
</div>

        {/* ADDRESS */}
        <div className="text-sm space-y-3">
          <p>
            <span className="text-white font-medium">Email : </span>
            classyvillaofficial@gmail.com
          </p>

          <p>
            <span className="text-white font-medium">Address : </span>
            New no 355 / 2 A1B,<br />
            Athnavoor, Yelagiri Hills,<br />
            Near AGS Resort
          </p>

          <p>
            <span className="text-white font-medium">Contact : </span>
            +91 9840942784
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3 mt-5 text-sm">
          <Link to="/about" className="hover:text-white transition">
            About
          </Link>
          <Link to="/teams" className="hover:text-white transition">
            Teams / Careers
          </Link>
          <Link to="/support" className="hover:text-white transition">
            Support
          </Link>
        </div>

        {/* POLICIES */}
        <div className="flex flex-col gap-3 mt-5 text-sm">
          <Link to="/term" className="hover:text-white transition">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="hover:text-white transition">
            Privacy Policies
          </Link>
          <Link to="/trust" className="hover:text-white transition">
            Trust & Safety
          </Link>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="w-full border-t border-gray-700 my-10"></div>

      {/* COPYRIGHT */}
      <p className="text-gray-400 text-sm text-center">
        {new Date().getFullYear()} © ClassyVilla.com
      </p>

    </footer>
  );
}
