"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});

const lineData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Monthly Sales",
      data: [65, 59, 80, 81, 56, 60, 30, 35, 40, 74, 60, 80],
      fill: true,
      borderColor: "rgb(241, 245, 245)",
      tension: 0.4,
    },
  ],
};

const barData = {
  labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
  datasets: [
    {
      label: "Product Performance",
      data: [50, 80, 30, 60, 90],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

// Dummy Product Data
const products = [
  { id: 1, name: "Smartphone", price: "$699", image: "/images/phone.jpg" },
  { id: 2, name: "Laptop", price: "$1099", image: "/images/laptop.jpg" },
  { id: 3, name: "Headphones", price: "$299", image: "/images/headphones.jpg" },
  { id: 4, name: "Smartwatch", price: "$199", image: "/images/watch.jpg" },
];

export default function ProductPerformance() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Product Performance Overview</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Side - Product List */}
        <div className="col-span-1 bg-gray-900 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">All Products</h2>
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg mb-3"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-medium">{product.name}</p>
                  <p className="text-gray-400">{product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Graphs */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">Monthly Sales</h2>
            <Line data={lineData} />
          </div>

          <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">Product Performance</h2>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}
