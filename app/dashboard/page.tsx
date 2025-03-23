"use client";

import OverView from "@/components/Dashboard/OverView";
import ProductPerformance from "@/components/Dashboard/ProductPerformance";
import NavBar from "@/components/Dashboard/NavBar";

export default function DashboardPage() {
  return (
    <div>
      <NavBar />
      <OverView />
      <ProductPerformance />
    </div>
  );
}
