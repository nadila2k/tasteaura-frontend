import React from "react";
import OrderStatus from "../enum/orderStatus";
import OrderType from "../enum/OrderType";
import { useNavigate } from "react-router-dom";

export default function OrderTable({
  orders,
  selectedType,
  onView,
  onStatusChange,
}) {
  const navigate = useNavigate();

  const handleView = (order) => {
    navigate(`/admin-dashboard/order-view-admin/${order.id}`);
  };

  // ✅ Allowed statuses by order type
  const getAllowedStatuses = (orderType) => {
    if (orderType === OrderType.DELIVERY) {
      return [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.DELIVERED,
        OrderStatus.COMPLETED,
        OrderStatus.CANCELLED,
      ];
    } else {
      // TAKEAWAY
      return [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.COMPLETED,
        OrderStatus.CANCELLED,
      ];
    }
  };

  // ✅ Status color styling
  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-100 text-yellow-700";
      case OrderStatus.CONFIRMED:
        return "bg-blue-100 text-blue-700";
      case OrderStatus.PREPARING:
        return "bg-purple-100 text-purple-700";
      case OrderStatus.OUT_FOR_DELIVERY:
        return "bg-orange-100 text-orange-700";
      case OrderStatus.DELIVERED:
      case OrderStatus.COMPLETED:
        return "bg-green-100 text-green-700";
      case OrderStatus.CANCELLED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-md bg-white mt-6">
      <h2 className="text-xl font-semibold px-6 pt-4 text-gray-800">
        {selectedType === OrderType.DELIVERY
          ? "Delivery Orders"
          : "Takeaway Orders"}
      </h2>

      <table className="w-full text-sm text-left text-gray-700 border-collapse mt-2">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-6 py-3 font-semibold">Order ID</th>
            <th className="px-6 py-3 font-semibold">Username</th>
            <th className="px-6 py-3 font-semibold">Address</th>
            <th className="px-6 py-3 font-semibold">Order Date</th>
            <th className="px-6 py-3 font-semibold">Total Amount</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">{order.id}</td>
                <td className="px-6 py-3">{order.username}</td>
                <td className="px-6 py-3">{order.address}</td>
                <td className="px-6 py-3">{order.orderDate}</td>
                <td className="px-6 py-3">
                  LKR {Number(order.totalAmount).toFixed(2)}
                </td>

                {/* ✅ Status: dropdown only if not COMPLETED/CANCELLED */}
                <td className="px-6 py-3">
                  {order.status === OrderStatus.COMPLETED ||
                  order.status === OrderStatus.CANCELLED ? (
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  ) : (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order.id, e.target.value)
                      }
                      className={`border rounded-md px-2 py-1 text-sm font-medium focus:outline-none ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getAllowedStatuses(order.orderType).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
                </td>

                {/* ✅ View Button */}
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleView(order)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-6 text-gray-500 italic"
              >
                No {selectedType.toLowerCase()} orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
