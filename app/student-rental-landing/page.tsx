'use client';
import Image from 'next/image';
import Link from "next/link";
import Landing_Nav from "@/components/landing-page-components/Landing_Nav";
import Landing_Footer from "@/components/landing-page-components/Landing_Footer";
const products = [
  {
    id: 1,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png" // Replace with actual image path
  },
  {
    id: 2,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 3,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 4,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 5,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png" // Replace with actual image path
  },
  {
    id: 6,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 7,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 8,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 9,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png" // Replace with actual image path
  },
  {
    id: 10,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 11,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  },
  {
    id: 12,
    name: "BBA Men's Shirt",
    seller: "Rahul Sharma",
    price: "₹ 10/hour",
    imageUrl: "/uniform2 1.png"
  }
];

export default function Hero() {
  return (
    <>
    <Landing_Nav/>
    <div className="flex justify-center gap-2 sm:gap-4 mb-4 pt-4 px-2 sm:px-4">
      <Link href="/student-rental-landing/women">
    <button  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1 sm:py-2 bg-black text-white rounded-full text-sm sm:text-base">
      <img 
        src="/women.png"
        alt="Woman icon"
        className="w-8 h-8 sm:w-8 sm:h-8 rounded-full object-cover"
      />
      Women
    </button>
    </Link>
    <Link href="/student-rental-landing">
    <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1 sm:py-2 bg-black text-white rounded-full text-sm sm:text-base">
      <img 
        src="/men.png"
        alt="Man icon"
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
      />
      Men
    </button>
    </Link>
  </div>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold ">Rent Uniforms</h1>
      <p className="text-center text-gray-800 mb-6 font-bold">
        Uniforms of GL Bajaj Institute of Technology and Management
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border-2 border-gray-400 rounded-lg shadow-lg p-3">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-sm text-gray-800 mt-3" >
              Seller: <span className="text-blue-600">{product.seller}</span>
            </p>
            <p className="text-sm font-bold mt-3">Price: {product.price}</p>
            <button className="w-full mt-3 bg-black text-white py-2 rounded-md hover:bg-gray-800">
              Rent !
            </button>
          </div>
        ))}
      </div>
    </div>
    <Landing_Footer />
    </>
  );
}
export {Hero}