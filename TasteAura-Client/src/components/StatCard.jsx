import React from "react";

export default function StatCard({ title, value, icon, color = "bg-blue-500" }) {
  return (
    <div className={`flex items-center p-4 bg-white shadow-md rounded-lg w-full max-w-xs`}>

      <div className={`p-3 rounded-full ${color} text-white text-2xl mr-4`}>
        {icon}
      </div>

      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>
    </div>
  );
}