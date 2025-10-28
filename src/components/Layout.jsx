import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">
      <NavBar />
      <div className="min-h-screen w-full bg-black ">
        <Outlet />
      </div>
    </div>
  );
}
