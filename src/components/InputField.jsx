import React from "react";

export default function InputField({
  label,
  name,
  register,
  type = "text",
  className = "",
  ...rest
}) {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="mb-1 text-lg text-gray-400">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        {...register}
        className={`border rounded px-3 py-2 w-[350px] focus:outline-none focus:ring-2 focus:ring-white-400 bg-stone-50  text-gray-900 ${className}`}
        {...rest}
      />
    </div>
  );
}
