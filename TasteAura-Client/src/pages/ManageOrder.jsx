import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "../apiHelper";
import toast from "react-hot-toast";
import OrderType from "../enum/OrderType";
import OrderStatus from "../enum/orderStatus";
import OrderTable from "../components/OrderTable";

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedType, setSelectedType] = useState(OrderType.DELIVERY);
  const [selectedStatusTab, setSelectedStatusTab] = useState("ONGOING");
  const navigate = useNavigate();


  const fetchOrders = async () => {
    try {
      const response = await apiHelper.get(
        "orders",
        {},
        { auth: true, notify: false }
      );

      
      const data = response?.data || response;
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders by type and status
  const filteredOrders = orders.filter((order) => {
    if (order.orderType !== selectedType) return false;

    if (selectedStatusTab === "ONGOING") {
      return [
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
        OrderStatus.PREPARING,
        OrderStatus.OUT_FOR_DELIVERY,
        OrderStatus.DELIVERED,
      ].includes(order.status);
    } else if (selectedStatusTab === "COMPLETED") {
      return order.status === OrderStatus.COMPLETED;
    } else if (selectedStatusTab === "CANCELLED") {
      return order.status === OrderStatus.CANCELLED;
    }
    return true;
  });


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiHelper.put(
        `orders/${orderId}/status?status=${newStatus}`,
        {},
        { auth: true, notify: false }
      );
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-6">
      <h1 className="text-2xl font-semibold mb-5">Manage Orders</h1>

   
      <div className="flex space-x-4 mb-4">
        {["ONGOING", "COMPLETED", "CANCELLED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedStatusTab(tab)}
            className={`px-4 py-2 rounded-2xl shadow transition font-medium ${
              selectedStatusTab === tab
                ? tab === "ONGOING"
                  ? "bg-blue-600 text-white"
                  : tab === "COMPLETED"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

    
      <div className="flex space-x-4 mb-6">
        {[OrderType.DELIVERY, OrderType.TAKEAWAY].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2 rounded-2xl shadow transition font-medium ${
              selectedType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

   
      <OrderTable
        orders={filteredOrders}
        selectedType={selectedType}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
