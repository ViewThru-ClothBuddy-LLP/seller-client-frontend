"use client"; // Required for interactivity

import Landing_Footer from "@/components/landing-page-components/Landing_Footer";
// import { useState } from "react";
// Remove unused Sidebar import

// Remove: import { Sidebar } from ...

import DashboardNavbar from "../components/Dasboard/Dasboardnavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (Collapsible on Mobile) */}


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} */}
        <DashboardNavbar />


        <main className="flex-1 pt-4 md:pt-6 overflow-auto bg-gray-100">
          {children}
          <Landing_Footer />
        </main>
      </div>
    </div>
  );
}
