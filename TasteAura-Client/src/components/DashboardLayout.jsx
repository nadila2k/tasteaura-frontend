import React from "react";

export default function DashboardLayout({ children, header }) {
  return (
    <div className=" flex flex-col items-center mt-5  ">
      <h1 className="text-4xl font-bold mb-4">{header}</h1>
      {children}
    </div>
  );
}
