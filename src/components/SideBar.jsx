import React from "react";
import LogoutButton from "./LogoutButton";

export default function SideBar({ children }) {
  return (
    <div className=" flex flex-col items-start bg-gray-800 text-white h-[90vh] --w-60 p-6 gap-4 shadow-lg">
      {children}
      <div className="mt-auto w-full">
        <LogoutButton />
      </div>
    </div>
  );
}
