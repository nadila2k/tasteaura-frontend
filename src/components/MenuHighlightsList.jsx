import React from "react";

export default function MenuHighlightsList({ item }) {
  return (
    <div className=" flex items-center justify-between w-full max-w-2xl border-b py-3 transition-all duration-300 hover:border-amber-400/80">
      <p className="text-amber-100 text-lg font-medium tracking-wide">{item.name}</p>
      <p className="text-amber-300 font-semibold text-lg">{item.price}</p>
    </div>
  );
}
