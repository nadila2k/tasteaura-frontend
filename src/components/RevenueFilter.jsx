import React, { useEffect, useState } from "react";

export default function RevenueFilter({ onFilter }) {
  const currentYear = new Date().getFullYear();

  const [filters, setFilters] = useState({
    year: currentYear,
    month: "",
  });

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Apply filters immediately on change
    const activeFilters = {
      year: parseInt(newFilters.year) || currentYear,
      month: newFilters.month ? parseInt(newFilters.month) : "",
    };
    onFilter(activeFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      year: currentYear,
      month: "",
    };
    setFilters(clearedFilters);

    // Immediately apply cleared filters
    onFilter({
      year: currentYear,
      month: "",
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow ">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year
          </label>
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Month
          </label>
          <select
            name="month"
            value={filters.month}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleClear}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
