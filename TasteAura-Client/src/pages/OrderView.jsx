import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiHelper from "../apiHelper";
import toast from "react-hot-toast";

import DashboardTable from "../components/DashboardTable";
import OrderStatus from "../enum/orderStatus";

export default function OrderView() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await apiHelper.get(
          `orders/${orderId}`,
          {},
          { auth: true, notify: false }
        );
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to fetch order");
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p className="text-center mt-10 text-gray-500">Loading order...</p>;
  }

  // Columns for order items table
  const itemColumns = [
    { key: "menuItemName", label: "Item Name" },
    { key: "quantity", label: "Quantity" },
    { key: "subtotal", label: "Subtotal", type: "price" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="font-semibold">Order ID:</p>
          <p>{order.id}</p>
        </div>
        <div>
          <p className="font-semibold">Order Date:</p>
          <p>{order.orderDate}</p>
        </div>
        <div>
          <p className="font-semibold">Total Amount:</p>
          <p>LKR {Number(order.totalAmount).toFixed(2)}</p>
        </div>
        <div>
          <p className="font-semibold">Order Type:</p>
          <p>{order.orderType}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              [
                OrderStatus.PENDING,
                OrderStatus.CONFIRMED,
                OrderStatus.PREPARING,
                OrderStatus.OUT_FOR_DELIVERY,
                OrderStatus.DELIVERED,
              ].includes(order.status)
                ? "bg-yellow-600"
                : order.status === OrderStatus.COMPLETED
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Order Items</h2>
      <DashboardTable
        columns={itemColumns}
        data={order.orderItems}
        onView={null}
        onEdit={null}
        onDelete={null}
      />
    </div>
  );
}
