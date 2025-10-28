import React, { useEffect, useState } from "react";
import apiHelper from "../apiHelper";
import {
  FaBox,
  FaCheckCircle,
  FaDollarSign,
  FaShoppingCart,
  FaTimesCircle,
} from "react-icons/fa";
import StatsGrid from "../components/StatsGrid";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSelectors";

export default function CustomerProfile() {
  const [stats, setStats] = useState([]);

  const user = useSelector(selectUser);
  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const data = await apiHelper.get(
          "dashboard/cards/customer",
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
            icon: <FaCheckCircle />,
            color: "bg-blue-500",
          },
          {
            title: "Cancelled Orders",
            value: data.cancelledOrders,
            icon: <FaTimesCircle />,
            color: "bg-red-500",
          },
          {
            title: "Total Spent",
            value: `LKR ${data.totalSpent.toLocaleString("en-LK")}.00`,
            icon: <FaDollarSign />,
            color: "bg-purple-500",
          },
          {
            title: "Today’s Spending",
            value: `LKR ${data.todaySpent.toLocaleString("en-LK")}.00`,
            icon: <FaDollarSign />,
            color: "bg-pink-500",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to fetch customer stats:", error);
        toast.error("Failed to fetch your dashboard stats");
      } finally {
      
      }
    };

    fetchCustomerStats();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full p-6">
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-500">Here’s your dashboard overview.</p>
        </div>
      </div>

      <StatsGrid stats={stats} />
    </div>
  );
}
