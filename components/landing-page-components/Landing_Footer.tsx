"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Landing_Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-black text-white py-6 px-10">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Logo and Newsletter */}
        <div>
          <h2 className="text-xl font-bold">ClothBuddy</h2>
          <p className="text-sm mt-2">Subscribe to our Newsletter</p>
          <div className="flex mt-2">
            {mounted && (
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 text-black rounded-l-2xl w-full max-w-xs focus:ring-2 focus:ring-[#E59F9F]"
              />
            )}
            <button
              type="button"
              aria-label="Subscribe"
              className="bg-[#E59F9F] text-white px-4 rounded-r-2xl"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Middle Section - Help & About Us */}
        <div>
          <h3 className="font-semibold">Help</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
          <h3 className="font-semibold mt-4">About Us</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <Link href="/about" className="hover:underline" target="_blank">
                Who we are?
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Policies */}
        <div>
          <h3 className="font-semibold">Policies</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li>
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Landing_Footer;
