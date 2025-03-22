"use client";
import { useState, useEffect } from "react";

import "chart.js/auto";
import { FaBox } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";



const OverviewPage = () => {
  const [stats] = useState({
    customer: 320,
    netProfit: 75800,
    product: 12000,
  });

  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.email) {
        // Extract name from email (temporary solution)
        const name = user.email.split('@')[0];
        setUserName(name.charAt(0).toUpperCase() + name.slice(1));
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-black dark:text-white flex flex-col items-center p-8 transition-all duration-500">
      {/* Welcome Message */}
      <div className="text-left w-full max-w-4xl mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mt-20 lg:mt-28">
          Welcome back, {userName}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
          {/* // Change
          Here's your latest sales overview
          // To */}
          Here&apos;s your latest sales overview
        </p>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-10">
        Overview Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Total Products Sold */}
        <div className=" group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <FaBox className="text-4xl text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Products Sold
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {stats.product.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Net Profit */}
        <div className=" group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <FaRupeeSign className="text-4xl text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Net Profit
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                ₹{stats.netProfit.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>

        {/* Total Customers */}
        <div className=" group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <IoPeople className="text-4xl text-purple-600" />
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Customers
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {stats.customer.toLocaleString()}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
