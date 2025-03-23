// page.js this is the entry point of application

"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Monthly Sale",
      data: [65, 59, 80, 81, 56, 60, 30, 35, 40, 74, 60, 180],
      fill: true,
      borderColor: "rgb(241, 245, 245)",
      tension: 0.1,
    },
  ],
};
const LineChart = () => {
  return (
    <div style={{ width: "700px", height: "700px" }}>
      <h1>Example 1: Line Chart</h1>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
