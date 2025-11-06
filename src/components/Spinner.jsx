import React from "react";

export default function Spinner({
  size = "h-15 w-15",
  color = "border-current",
  text = "Loading...",
  textColor = "text-gray-600",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`inline-block ${size} animate-spin rounded-full border-4 border-solid ${color} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      ></div>
      <span className={`text-sm font-medium ${textColor}`}>{text}</span>
    </div>
  );
}