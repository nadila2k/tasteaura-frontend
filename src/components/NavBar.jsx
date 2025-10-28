import React, { use, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { div } from "motion/react-client";
import { FaEnvelope, FaUser } from "react-icons/fa";
import logo from "../images/logo2.png";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-b-gray-700 bg-black/80 px-16 py-2 text-white md:justify-evenly">
      <Link to="/">
        <img src={logo} alt="Logo" className="h-20 w-auto object-cover" />
      </Link>
      <ul className="hidden md:flex gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "text-gray-300 hover:text-white transition"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="menu"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "text-gray-300 hover:text-white transition"
          }
        >
          Menu
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "text-gray-300 hover:text-white transition"
          }
        >
          About
        </NavLink>
        <NavLink
          to="gallery"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "text-gray-300 hover:text-white transition"
          }
        >
          Gallery
        </NavLink>
        <NavLink
          to="customer-dashboard/checkout"
          className={({ isActive }) =>
            isActive
              ? "text-white"
              : "text-gray-300 hover:text-white transition"
          }
        >
          Checkout
        </NavLink>
      </ul>
      <ul className="hidden md:flex gap-6">
        <NavLink
          to="auth/sign-in"
          className="flex items-center justify-center w-12 h-12 
             text-gray-500 hover:text-gray-700 
             transition-colors duration-200 rounded-md text-3xl"
        >
          <FaUser />
        </NavLink>
      </ul>
    </nav>
  );
}
