import React, { useEffect, useState } from "react";
import StatsGrid from "../components/StatsGrid";
import { FaBox, FaDollarSign, FaShoppingCart, FaUser } from "react-icons/fa";

import { toast } from "react-hot-toast";
import apiHelper from "../apiHelper";
import RevenueChart from "../components/RevenueChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState("stats");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiHelper.get(
          "dashboard/cards/admin",
          {},
          { auth: true, notify: false }
        );

        const formattedStats = [
          {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <FaShoppingCart />,
            color: "bg-green-500",
          },
          {
            title: "Ongoing Orders",
            value: data.ongoingOrders,
            icon: <FaBox />,
            color: "bg-yellow-500",
          },
          {
            title: "Completed Orders",
            value: data.completedOrders,
            icon: <FaBox />,
            color: "bg-blue-500",
          },
          {
            title: "Cancelled Orders",
            value: data.cancelledOrders,
            icon: <FaBox />,
            color: "bg-red-500",
          },
          {
            title: "Total Users",
            value: data.totalUsers,
            icon: <FaUser />,
            color: "bg-indigo-500",
          },
          {
            title: "Total Categories",
            value: data.totalCategories,
            icon: <FaBox />,
            color: "bg-pink-500",
          },
          {
            title: "Total Menu Items",
            value: data.totalMenuItems,
            icon: <FaBox />,
            color: "bg-teal-500",
          },
          {
            title: "Revenue Today",
            value: `LKR ${data.revenueToday.toLocaleString("en-LK")}.00`,
            icon: <FaDollarSign />,
            color: "bg-purple-500",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        toast.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-6 w-full justify-center items-center">
      <h1 className="text-3xl font-extrabold mb- text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="flex gap-4">
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow transition ${
            isSelected === "stats"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setIsSelected("stats")}
        >
          View Stats
        </button>
        <button
          className={`px-6 py-2 font-semibold rounded-lg shadow transition ${
            isSelected === "revenue"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setIsSelected("revenue")}
        >
          Revenue Chart
        </button>
      </div>

      <div className="flex flex-col justify-center items-center mt-3 w-full">
        {isSelected === "stats" && <StatsGrid stats={stats} />}
        {isSelected === "revenue" && <RevenueChart />}
      </div>
    </div>
  );
}
