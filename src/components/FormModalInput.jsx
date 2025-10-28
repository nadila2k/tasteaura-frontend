import React from "react";

export default function FormModalInput({ label, name, register, type = "text", error, options = [] }) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "file" ? (
        <input
          id={name}
          type="file"
          accept="image/*"
          {...register}
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          {...register}
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...register}
          className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}
