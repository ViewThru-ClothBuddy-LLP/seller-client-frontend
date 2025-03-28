"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { supabase } from "@/lib/supabaseClient";
import "remixicon/fonts/remixicon.css";
import Image from "next/image";

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    adhar: "",
    pan: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [gridItems, setGridItems] = useState<number[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(setError)
    
  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = Array(
        Math.ceil(window.innerWidth / 64) * Math.ceil(window.innerHeight / 64)
      ).fill(null);
      setGridItems(items);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError(null);

    // // Supabase Sign Up
    // const { data, error } = await supabase.auth.signUp({
    //   email: formData.email,
    //   password: formData.password,
    // });

    // if (error) {
    //   setError(error.message);
    //   return;
    // }

    // console.log("User registered:", data);
    router.push("/signup2"); // This will redirect to dashboard after successful registration
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-r from-[#4B7DFA] to-[#F35EA0] w-full text-white overflow-x-hidden">
        {/* ClothBuddy Logo */}
        <div className="absolute opacity-40 top-24 left-4 md:top-40 md:left-72 -rotate-[25deg]">
          <Image
            src="/ClothBuddyLogo.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </div>
        {/* CLothBuddy Logo */}
        <div className="absolute opacity-40 right-10 top-80 md:left-2/3 rotate-[25deg]">
          <Image
            src="/ClothBuddyLogo.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </div>
        {/* CLothBuddy Logo */}
        <div className="absolute opacity-40 bottom-4 right-10 md:bottom-10 md:right-10 rotate-[25deg]">
          <Image
            src="/ClothBuddyLogo.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </div>
        <div className="absolute opacity-40 bottom-24 left-16 md:bottom-32 md:left-96 -rotate-[10deg]">
          <Image
            src="/ClothBuddyLogo.png"
            alt="Logo"
            width={120}
            height={120}
          />
        </div>
        {/* Background hovering effect */}
        <div className="absolute top-0 left-0 w-full grid grid-cols-[repeat(auto-fit,64px)] grid-rows-[repeat(auto-fit,64px)] z-10 h-screen overflow-hidden">
          {gridItems.map((_, i) => (
            <div
              key={i}
              className="border-2 border-[#A4C8E1] w-16 h-16 opacity-0 hover:opacity-100 duration-300 ease-out"
            ></div>
          ))}
        </div>

        {/* Content div */}
        <div>
          <nav className="flex justify-between items-center bg-black px-4 md:px-8 h-20 z-50">
            {/* navbar left side */}
            <div className="flex items-center font-bold text-3xl z-50">
              <h1>ClothBuddy</h1>
            </div>
          </nav>

          {/* Registration Form */}
          <div className="mx-auto max-w-md p-6 mt-12 z-30 relative">
            <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-white/10">
              <h2 className="mb-6 text-center text-2xl font-semibold text-black">
                Register
              </h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {mounted && (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full rounded-md bg-gray-300 px-4 py-2 text-black placeholder-black text-sm"
                  />
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    maxLength={12}
                    pattern="\d{12}"
                    title="Aadhaar number should be 12 digits"
                    className="w-full rounded-md bg-gray-300 px-4 py-2 text-black placeholder-black text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full rounded-md bg-gray-300 px-4 py-2 text-black placeholder-black text-sm"
                  />
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      name="adhar"
                      value={formData.adhar}
                      onChange={handleChange}
                      placeholder="Addhar Number"
                      required
                      minLength={12}
                      className="w-full rounded-md bg-gray-300 px-4 py-2 text-black placeholder-black text-sm"
                    />
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="pan"
                      value={formData.pan}
                      onChange={handleChange}
                      placeholder="Pan Number"
                      required
                      minLength={10}
                      className="w-full rounded-md bg-gray-300 px-4 py-2 text-black placeholder-black text-sm"
                    />
                    
                  </div>
                  <button
                    className="w-full rounded-lg bg-blue-800 py-2 font-medium text-white hover:blue-900 text-sm"
                  >
                    Next
                  </button>
                </form>
              )}
              <p className="mt-4 text-center text-sm text-black">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-800 hover:underline">
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