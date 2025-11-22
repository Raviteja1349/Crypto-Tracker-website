import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// ✅ Register all Chart.js elements once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartSection({ chartData, coinName }) {
  if (!chartData || chartData.length === 0)
    return <p className="text-gray-400 text-center p-4">No chart data</p>;

  const data = {
    labels: chartData.map(([timestamp]) =>
      new Date(timestamp).toLocaleDateString()
    ),
    datasets: [
      {
        label: `${coinName} Price (USD)`,
        data: chartData.map(([, price]) => price),
        borderColor: "#4f8cff",
        backgroundColor: "rgba(79,140,255,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#9ca3af" } },
      y: { ticks: { color: "#9ca3af" } },
    },
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-64 sm:h-80 md:h-96">
  <Line data={data} options={options} />
</div>

  );
}

export default ChartSection;
