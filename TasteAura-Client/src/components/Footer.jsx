import React from "react";
import logo from "../images/logo2.png";
import footer from "../images/footer.avif";

export default function Footer() {
  return (
    <div
      className="w-full bg-cover bg-center text-amber-100 mt-16 relative"
      style={{ backgroundImage: `url(${footer})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative p-10 md:p-16 flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="Taste Aura Logo"
            className="w-36 md:w-48 p-2 "
          />
        </div>

        {/* Opening Hours */}
        <div className="flex flex-col text-amber-300">
          <p className="font-bold text-lg mb-4 border-b border-amber-300 pb-2">
            OPENING HOURS
          </p>
          <p className="mb-1">MONDAY – THURSDAY</p>
          <p className="mb-2">12.00 – 3.30 PM & 6.30 – 10.30 PM</p>
          <p className="mb-1">FRIDAY – SUNDAY</p>
          <p className="mb-2">12.00 – 3.30 PM & 6.30 – 10.30 PM</p>
          <p className="text-amber-100 italic text-sm">(Hours might differ)</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col text-amber-300">
          <p className="font-bold text-lg mb-4 border-b border-amber-300 pb-2">
            CONTACT US
          </p>
          <p className="mb-1">No 25 Kensington Garden, Colombo 00400</p>
          <p className="mb-1">info@nadila.com</p>
          <p className="mb-1">+94 11 2 345 678</p>
        </div>
      </div>

      {/* Footer bottom text */}
      <div className="relative text-center text-amber-200 text-sm py-4 border-t border-amber-300">
        © 2025 Taste Aura. All rights reserved.
      </div>
    </div>
  );
}
