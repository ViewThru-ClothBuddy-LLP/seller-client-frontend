"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { FaBox, FaDollarSign, FaEye } from "react-icons/fa";
// Dynamically import Bar Chart to prevent SSR issues
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalSold: 320,
    totalEarnings: 75800,
    totalViews: 12000,
  });

  const [data, setData] = useState({
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Wishlist Products",
        data: [40, 60, 45, 80, 55], // Wishlist count
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Products Sold",
        data: [25, 50, 30, 70, 40], // Sold count
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className=" bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">📊 Overview Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Total Sold */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <FaBox className="text-4xl text-blue-400" />
          <div>
            <p className="text-lg">Total Sold</p>
            <h2 className="text-2xl font-bold">{stats.totalSold}</h2>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <FaDollarSign className="text-4xl text-green-400" />
          <div>
            <p className="text-lg">Total Earnings</p>
            <h2 className="text-2xl font-bold">${stats.totalEarnings}</h2>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg flex items-center space-x-4">
          <FaEye className="text-4xl text-yellow-400" />
          <div>
            <p className="text-lg">Total Views</p>
            <h2 className="text-2xl font-bold">{stats.totalViews}</h2>
          </div>
        </div>
      </div>
      {/* Chart Section */}
    </div>
  );
};

export default OverviewPage;
