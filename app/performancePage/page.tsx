"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartOptions } from "chart.js";
import { MoreHorizontal, Search, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartData = {
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
  datasets: [
    {
      data: [12, 11, 13, 9, 12, 11, 10, 13],
      backgroundColor: "#6A6A6A",
      borderRadius: 4,
    },
  ],
};
const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: string | number) => `₹ ${Number(value)}k`,
      },
      
    },
  },
};

type Order = {
  id: string;
  product: string;
  date: string;
  price: string;
  payment: string;
  status: string;
};
const orders: Order[] = [
  {
    id: "#2456JL",
    product: "Nike Sportswear",
    date: "Jan 12, 12:23 pm",
    price: "₹ 134.00",
    payment: "Transfer",
    status: "Processing",
  },
  {
    id: "#5435DF",
    product: "Acqua di Parma",
    date: "May 01, 01:13 pm",
    price: "₹ 23.00",
    payment: "Credit Card",
    status: "Completed",
  },
];

export default function Dashboard() {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => setLoading(true), []);
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          {isLoading && (
            <input
              placeholder="Search..."
              className="h-9 w-full md:w-auto rounded-md border pl-8 pr-4 text-sm"
            />
          )}
        </div>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>

      <h1 className="text-2xl font-semibold text-center md:text-left">
        Welcome back, User!
      </h1>
      <p className="text-sm text-muted-foreground text-center md:text-left">
        Here&apos;s Your Current Sales Overview
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 bg-black text-white">
          <p>Net Profit</p>
          <h2 className="text-2xl font-bold">Rs. 7000000</h2>
        </Card>
        <Card className="p-6">
          <p>Product</p>
          <h2 className="text-2xl font-bold">2,107</h2>
        </Card>
        <Card className="p-6">
          <p>Customers</p>
          <h2 className="text-2xl font-bold">653</h2>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-5 font-semibold">Monthly Recurring Revenue</h3>
          <div className="h-[250px] sm:h-[300px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-5 font-semibold">Top Selling Products</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-muted" />
                  <p>PRODUCT {i}</p>
                </div>
                <span className="text-green-600">Available</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
          <h3 className="text-lg font-medium">Latest Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="whitespace-nowrap px-4">
                  Order Date
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="text-sm">
                  <TableCell className="px-4">{order.id}</TableCell>
                  <TableCell className="px-4">{order.product}</TableCell>
                  <TableCell className="whitespace-nowrap px-4 text-center">
                    {order.date}
                  </TableCell>
                  <TableCell className="px-4">{order.price}</TableCell>
                  <TableCell className="px-4">{order.payment}</TableCell>
                  <TableCell
                    className={
                      order.status === "Completed"
                        ? "text-green-600 px-4"
                        : "text-blue-600 px-4"
                    }
                  >
                    {order.status}
                  </TableCell>
                  <TableCell className="px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Area,
// } from "recharts";

// // Define types for our data structure
// export interface Product {
//   id: string;
//   name: string;
//   image: string;
//   sales: number;
//   percentGrowth: number;
//   stockRemaining: number;
// }

// export interface MonthlyData {
//   month: string;
//   units: number;
// }

// export interface SizeData {
//   size: string;
//   units: number;
// }

// export interface CategoryData {
//   label: string;
//   sizeData: SizeData[];
//   monthlyData: MonthlyData[];
//   products: Product[];
// }

// export interface ProductDataType {
//   [key: string]: CategoryData;
// }

// // Import your product data here
// // You would have this in a separate file or use API fetching
// import productData from "../../components/Product Data/Product Data";
// import Image from "next/image";

// const ProductDashboard: React.FC = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("shirts");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [categoryData, setCategoryData] = useState<CategoryData>(
// {
//   ...productData[selectedCategory as keyof ProductDataType],
//   products: productData[selectedCategory as keyof ProductDataType].products.map(product => ({
//     ...product,
//     id: product.id.toString()
//   }))
// }
//   );

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const categories = [
//     { id: "shirts", name: "Shirts" },
//     { id: "pants", name: "Pants" },
//     { id: "dresses", name: "Dresses" },
//     { id: "accessories", name: "Accessories" },
//     { id: "menswear", name: "Men's Wear" },
//     { id: "womenswear", name: "Women's Wear" },
//   ];

//   useEffect(() => {
//     setCategoryData({
//       ...productData[selectedCategory as keyof ProductDataType],
//       products: productData[selectedCategory as keyof ProductDataType].products.map(product => ({
//         ...product,
//         id: product.id.toString()
//       }))
//     });
//   }, [selectedCategory]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleCategorySelect = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     setIsDropdownOpen(false);
//   };

//   const peakMonth = [...categoryData.monthlyData].sort(
//     (a, b) => b.units - a.units
//   )[0];
//   const peakMonthIndex = categoryData.monthlyData.findIndex(
//     (item) => item.month === peakMonth.month
//   );
//   const peakMonthPosition =
//     (peakMonthIndex / (categoryData.monthlyData.length - 1)) * 100;

//   // Add proper TypeScript typing for props
//   interface CustomBarProps {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     index: number;
//   }

//   const renderCustomBar = (props: CustomBarProps) => {
//     const { x, y, width, height, index } = props;
//     const isMax = categoryData.monthlyData[index].units === peakMonth.units;

//     return (
//       <rect
//         x={x}
//         y={y}
//         width={isMax ? width * 1.5 : width}
//         height={height}
//         fill={isMax ? "#FF6B6B" : "#3E54C8"}
//         opacity={isMax ? 1 : 0.6}
//         rx={2}
//         ry={2}
//       />
//     );
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header with dropdown */}
//       <div className="mb-6">
//         <div className="relative inline-block text-left" ref={dropdownRef}>
//           <div>
//             <button
//               type="button"
//               className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               {categories.find((cat) => cat.id === selectedCategory)?.name ||
//                 "Select Category"}
//               <svg
//                 className="-mr-1 ml-2 h-5 w-5"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           {isDropdownOpen && (
//             <div className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//               <div
//                 className="py-1"
//                 role="menu"
//                 aria-orientation="vertical"
//                 aria-labelledby="options-menu"
//               >
//                 {categories.map((category) => (
//                   <button
//                     key={category.id}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     role="menuitem"
//                     onClick={() => handleCategorySelect(category.id)}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">{categoryData.label}</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={categoryData.sizeData}
//                 margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="size"
//                   label={{
//                     value: "Size",
//                     position: "insideBottom",
//                     offset: -5,
//                   }}
//                 />
//                 <YAxis
//                   label={{
//                     value: "Units",
//                     angle: -90,
//                     position: "insideLeft",
//                     offset: -30,
//                     style: { textAnchor: "middle" },
//                   }}
//                   tick={{ dx: -5 }}
//                   tickMargin={8}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="units" fill="#4B5563" barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-medium">Selling Growth</h2>
//             <button className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
//               View All Products
//             </button>
//           </div>
//           <div className="space-y-6">
//             {categoryData.products.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
//               >
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center shadow-sm">
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       className="w-10 h-10 object-cover"
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-sm font-medium">{product.name}</h3>
//                     <p className="text-xs text-gray-500">
//                       {product.sales.toLocaleString()} Sales
//                     </p>
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center text-sm">
//                     <svg
//                       className={`w-4 h-4 mr-1 ${
//                         product.percentGrowth > 5
//                           ? "text-green-500"
//                           : "text-red-500"
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d={
//                           product.percentGrowth > 0
//                             ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                             : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
//                         }
//                       />
//                     </svg>
//                     <span
//                       className={
//                         product.percentGrowth > 5
//                           ? "text-green-500 font-medium"
//                           : "text-red-500 font-medium"
//                       }
//                     >
//                       {product.percentGrowth}%
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500">
//                     {product.stockRemaining} Stocks Remaining
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-medium mb-4">Monthly record</h2>
//         <div className="h-64 relative">
//           <div
//             className="absolute text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-md"
//             style={{
//               left: `${peakMonthPosition + 0.5}%`,
//               top: "10%",
//               transform: "translateX(-50%)",
//             }}
//           >
//             Peak: {peakMonth.units} units
//           </div>

//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={categoryData.monthlyData}
//               margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//               <XAxis dataKey="month" />
//               <YAxis
//                 label={{
//                   value: "Units",
//                   angle: -90,
//                   position: "insideLeft",
//                   offset: -30,
//                   style: { textAnchor: "middle" },
//                 }}
//                 tick={{ dx: -5 }}
//                 tickMargin={8}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "rgba(255, 255, 255, 0.95)",
//                   borderRadius: "4px",
//                   boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
//                   border: "none",
//                 }}
//                 formatter={(value) => [`${value} units`, "Sales"]}
//               />

//               <defs>
//                 <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3E54C8" stopOpacity={0.2} />
//                   <stop offset="95%" stopColor="#3E54C8" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <Area
//                 type="monotone"
//                 dataKey="units"
//                 stroke="none"
//                 fill="url(#colorUnits)"
//                 fillOpacity={1}
//               />

//               <Bar 
//                 dataKey="units" 
//                 barSize={20} 
//                 shape={(props:any) => renderCustomBar(props as CustomBarProps)}
//               />

//               <Line
//                 type="monotone"
//                 dataKey="units"
//                 stroke="#3E54C8"
//                 strokeWidth={2}
//                 dot={({ cx, cy, payload }) => (
//                   <circle
//                     cx={cx}
//                     cy={cy}
//                     r={payload.units === peakMonth.units ? 5 : 3}
//                     fill={
//                       payload.units === peakMonth.units ? "#FF6B6B" : "#3E54C8"
//                     }
//                     stroke={
//                       payload.units === peakMonth.units ? "#FF4444" : "#3E54C8"
//                     }
//                     strokeWidth={payload.units === peakMonth.units ? 2 : 1}
//                   />
//                 )}
//                 activeDot={{
//                   r: 6,
//                   fill: "#3E54C8",
//                   stroke: "#fff",
//                   strokeWidth: 2,
//                 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDashboard;
