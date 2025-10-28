import React from "react";

// ✅ Helper function to safely access nested object keys
function getNestedValue(obj, path) {
  return path.split(".").reduce((value, key) => value?.[key], obj);
}

export default function DashboardTable({ columns, data, onEdit, onDelete, onView }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-md bg-white mt-6">
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        {/* Header */}
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3 font-semibold">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="px-6 py-3 text-center font-semibold">Actions</th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                {columns.map((col) => {
                  const value = getNestedValue(row, col.key);

                  return (
                    <td key={col.key} className="px-6 py-3 whitespace-nowrap">
                      {col.type === "image" ? (
                        <img
                          src={value}
                          alt={col.label}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ) : col.type === "price" ? (
                        <>LKR {Number(value).toFixed(2)}</>
                      ) : col.type === "availability" ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            value === "AVAILABLE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {value}
                        </span>
                      ) : (
                        value ?? "—"
                      )}
                    </td>
                  );
                })}

                {(onEdit || onDelete || onView) && (
                  <td className="px-6 py-3 flex gap-3 justify-center">
                    {onView && (
                      <button
                        onClick={() => onView(row)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-6 text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
