import React from "react";

export default function Button({ children, type, onclick, className }) {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
