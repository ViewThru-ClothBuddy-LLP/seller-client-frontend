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

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: "$699",
    image:
      "https://opsg-img-cdn-gl.heytapimg.com/epb/202406/26/IzcVfAu2kdJjoeYS.png",
  },
  {
    id: 2,
    name: "Laptop",
    price: "$1099",
    image:
      "https://s.yimg.com/uu/api/res/1.2/VAIXo0bjHGYVFAAaHAb8xw--~B/Zmk9c3RyaW07aD03MjA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2024-10/64081ea0-9d46-11ef-bfff-7ba57dd7df36",
  },
  {
    id: 3,
    name: "Headphones",
    price: "$299",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6drvlJqxL4tw_Uy7ZIsgWt3b_WD0yn577UQ&s",
  },
  {
    id: 4,
    name: "Smartwatch",
    price: "$199",
    image:
      "https://m.media-amazon.com/images/I/71IaJKeus7L._AC_UF1000,1000_QL80_.jpg",
  },
];

export default function ProductPerformance() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Product Performance Overview</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Product List */}
        <div className="w-full lg:w-1/3 bg-gray-900 p-4 rounded-xl shadow-md">
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
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
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
