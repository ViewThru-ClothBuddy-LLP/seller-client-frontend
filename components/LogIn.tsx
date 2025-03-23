"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";

const LogInPage: React.FC = () => {
  const router = useRouter();

  // Grid state
  const [gridItems, setGridItems] = useState<number[]>([]);
  // Function to calculate the exact number of grid items
  const calculateGridItems = () => {
    if (typeof window !== "undefined") {
      const cols = Math.ceil(window.innerWidth / 64);
      const rows = Math.ceil(window.innerHeight / 64);
      const totalItems = cols * rows;
      setGridItems(Array(totalItems).fill(null));
    }
  };

  // Update grid on mount and resize
  useEffect(() => {
    calculateGridItems(); // Initial calculation
    const handleResize = () => {
      calculateGridItems();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // form Data
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  // useEffect for login button to prevent hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // function for handling changes in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // function run when user clicked login button
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("#");
  };

  // Google auth functions
  const handleSuccess = (response: CredentialResponse) => {
    console.log("Google Login Success:", response);
    router.push("/");
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <main className="min-h-screen bg-[#2C3E50] w-full text-white overflow-hidden">
      {/* background hover effect */}
      <div className="absolute max-h-screen overflow-hidden w-full top-0 left-0 grid grid-cols-[repeat(auto-fit,64px)] grid-rows-[repeat(auto-fit,64px)] z-0">
          {gridItems.map((_, i) => (
            <div
              key={i}
              className="border-[#A4C8E1] border-2 opacity-0 hover:bg-[#A4C8E1] hover:opacity-100 duration-700 ease-out"
            ></div>
          ))}
        </div>
      {/* content div */}
      <div>
        <div className="h-20 flex pl-8 md:pl-10 items-center font-bold text-3xl z-50 relative">
          <h1 className="z-50 relative">ClothBuddy</h1>
        </div>

        {/* Sign In Form */}
        <div className="mx-auto max-w-md p-6 mt-12 z-50 relative">
          <div className="rounded-3xl bg-black p-8 shadow-lg ring-1 ring-white/10">
            <h1 className="mb-2 text-center text-2xl font-semibold">Log In</h1>
            <hr className="mb-6" />
            {isMounted && (
              <form onSubmit={handleSubmit} className="space-y-4 ">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-gray-800 text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-gray-600/50 py-2 font-medium text-white hover:bg-gray-600/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Log In
                </button>
              </form>
            )}

            {/* Google Auth */}
            <div className="mt-4">
              <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
              </GoogleOAuthProvider>
            </div>

            {/* Link to Sign Up Page */}
            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogInPage;
