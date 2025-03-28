import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "remixicon/fonts/remixicon.css";
import Link from "next/link";
import Image from "next/image";

const Landing_Nav: React.FC = () => {
  

  return (
    <footer>
      <nav className="navbar flex justify-between items-center px-7 py-5 container mx-auto">
       <Link href="/" className="flex items-center">
          <Image className="w-14 lg:h-14 lg:w-18 lg:h-18 mr-5" src="/ClothBuddyLogo.png" alt="ClothBuddy Logo" width={56} height={56} />
          <h1 className="hidden text-lg font-semibold text-black sm:block lg:text-xl">ClothBuddy</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* <Link href="/signup" className="text-lg font-normal hover:underline">
            Sell With Us
          </Link> */}
          <Link href="/" className="text-lg font-normal hover:underline">
            Success Stories
          </Link>
          <Link
            href="/signup"
            className="bg-black hover:bg-[#252525] text-white font-bold py-2 px-4 rounded-full"
          >
            Sell With Us
          </Link>
        </div>

      {/* Mobile Dropdown Menu */}
      <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Open navigation menu" className="text-xl">
                <i className="ri-menu-3-line font-bold"></i>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/signup">Sell With Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">Success Stories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">Sell with us</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      </footer>
    

  );

};


export default Landing_Nav;
