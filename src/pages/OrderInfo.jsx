import React, { useEffect, useState } from "react";
import DashboardTable from "../components/DashboardTable";
import apiHelper from "../apiHelper";
import toast from "react-hot-toast";
import OrderStatus from "../enum/orderStatus";
import { useNavigate } from "react-router-dom";

export default function OrderInfo() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("ONGOING");
  const navigate = useNavigate();


  const fetchOrders = async () => {
    try {
      const data = await apiHelper.get(
        "orders/my",
        {},
        { auth: true, notify: false }
      );
      setOrders(data);
      filterOrders(data, "ONGOING");
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const filterOrders = (ordersList, tab) => {
    let filtered = [];

    if (tab === "ONGOING") {
      filtered = ordersList.filter((o) =>
        [
          OrderStatus.PENDING,
          OrderStatus.CONFIRMED,
          OrderStatus.PREPARING,
          OrderStatus.OUT_FOR_DELIVERY,
          OrderStatus.DELIVERED,
        ].includes(o.status)
      );
    } else if (tab === "COMPLETED") {
      filtered = ordersList.filter((o) => o.status === OrderStatus.COMPLETED);
    } else if (tab === "CANCELLED") {
      filtered = ordersList.filter((o) => o.status === OrderStatus.CANCELLED);
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders(orders, selectedTab);
  }, [selectedTab]);

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "orderDate", label: "Order Date" },
    { key: "totalAmount", label: "Total Amount", type: "price" },
    { key: "orderType", label: "Order Type" },
    { key: "status", label: "Order Status" },
  ];

  const handleView = (order) => {
     navigate(`/customer-dashboard/order-view/${order.id}`);
  };

  return (
    <div className="flex flex-col items-center w-full p-6">
      <h1 className="text-2xl font-semibold mb-5">My Orders</h1>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedTab("ONGOING")}
          className={`px-4 py-2 rounded-2xl shadow transition ${
            selectedTab === "ONGOING"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setSelectedTab("COMPLETED")}
          className={`px-4 py-2 rounded-2xl shadow transition ${
            selectedTab === "COMPLETED"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setSelectedTab("CANCELLED")}
          className={`px-4 py-2 rounded-2xl shadow transition ${
            selectedTab === "CANCELLED"
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Cancelled
        </button>
      </div>

      <DashboardTable
        columns={columns}
        data={filteredOrders}
        onView={handleView}
      />
    </div>
  );
}
