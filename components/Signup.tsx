"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    aadhar: string;
    pan: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    aadhar: "",
    pan: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    router.push("/#");
  };

  // Google Auth functions
  const handleSuccess = (response: any) => {
    console.log("Google Login Success:", response);
    router.push("/");
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

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

  return (
    <>
      <main className="min-h-screen bg-[#2C3E50] w-full text-white">
        {/* Background hovering effect */}
        <div className="absolute max-h-screen overflow-hidden w-full top-0 left-0 grid grid-cols-[repeat(auto-fit,64px)] grid-rows-[repeat(auto-fit,64px)] z-0">
          {gridItems.map((_, i) => (
            <div
              key={i}
              className="border-[#A4C8E1] border-2 opacity-0 hover:bg-[#A4C8E1] hover:opacity-100 duration-700 ease-out"
            ></div>
          ))}
        </div>

        {/* Content div */}
        <div>
          <div className="h-20 flex pl-8 md:pl-10 items-center font-bold text-3xl">
            <h1 className="z-50 relative">ClothBuddy</h1>
          </div>

          {/* Registration Form */}
          <div className="mx-auto max-w-md p-6 z-50 relative">
            <div className="rounded-3xl bg-black p-8 shadow-lg ring-1 ring-white/10">
              <h2 className="mb-2 text-center text-2xl font-semibold">
                Register
              </h2>
              <hr className="mb-6" />

              {isMounted && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your User Name"
                      required
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your e-mail"
                      required
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={handleChange}
                      placeholder="Enter your Aadhaar Number"
                      required
                      maxLength={12}
                      pattern="\d{12}"
                      title="Aadhaar number should be 12 digits"
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      placeholder="Enter your PAN Number"
                      required
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                      title="Enter a valid PAN number (e.g., ABCDE1234F)"
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a new password"
                      required
                      minLength={6}
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      required
                      minLength={6}
                      className="w-full rounded-md bg-gray-600/50 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>


                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-gray-600/50 py-2 font-medium text-white hover:bg-gray-600/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      Register
                    </button>
                  </div>
                </form>
              )}

              {/* Google Auth */}
              <div className="mt-5">
                <GoogleOAuthProvider clientId="Your Google Client Id">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                </GoogleOAuthProvider>
              </div>

              {/* Link to Sign In Page */}
              <p className="mt-4 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
