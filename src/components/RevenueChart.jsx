import React, { useCallback, useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import apiHelper from "../apiHelper";
import RevenueFilter from "./RevenueFilter";

export default function RevenueChart() {
  const currentYear = new Date().getFullYear();
  const chartRef = useRef(null);

  const [filters, setFilters] = useState({
    year: currentYear,
    month: "",
  });

  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilter = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const fetchRevenue = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("year", filters.year);
        if (filters.month) queryParams.append("month", filters.month);

        const data = await apiHelper.get(
          `dashboard/revenue/admin?${queryParams.toString()}`,
          {},
          { auth: true, notify: false }
        );

        setRevenueData(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load revenue data. Please try again.");
        setRevenueData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [filters]);

  useEffect(() => {
    if (!revenueData.length) return;

    const chartInstance = echarts.init(chartRef.current);

    const dates = revenueData.map((item) => item[0]);
    const amounts = revenueData.map((item) => item[1]);

    const option = {
      title: {
        text: "",
        left: "center",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: dates,
        name: "DATE",
        nameLocation: "middle",
        nameGap: 30,
      },
      yAxis: {
        type: "value",
        name: "LKR",
        nameLocation: "middle",
        nameGap: 50,
      },
      series: [
        {
          data: amounts,
          type: "bar",
          color: "#4f46e5",
        },
      ],
      grid: { bottom: 50, left: 50, right: 50, top: 80 },
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [revenueData]);

  return (
    <div className="flex flex-col items-center w-full">
      <RevenueFilter onFilter={handleFilter} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div
        ref={chartRef}
        style={{ width: "100%", height: "400px"}}
      ></div>
    </div>
  );
}
