import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavSideBar({ name, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full px-4 py-2 rounded-md transition-colors duration-200 
        ${isActive ? "bg-gray-700 text-white font-semibold" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`
      }
    >
      {name}
    </NavLink>
  );
}
