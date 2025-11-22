import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin, fetchChart } from "../api/coingecko";
import ChartSection from "../components/ChartSection";
import TableView from "../components/TableView";
import { useCurrency } from "../context/CurrencyContext";


function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const { currency, symbol } = useCurrency();

// ✅ Fetch coin details + chart data
useEffect(() => {
  const loadData = async () => {
    setLoading(true);
    try {
      const [coinData, chartPrices] = await Promise.all([
        fetchCoin(id),
        fetchChart(id, days, currency),
      ]);
      setCoin(coinData);
      setChartData(chartPrices);
    } catch (error) {
      console.error("Error fetching coin detail:", error);
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, [id, days, currency]);

  if (loading) {
    return <p className="text-center text-gray-300 mt-10">Loading...</p>;
  }

  if (!coin) {
    return <p className="text-center text-red-400 mt-10">Coin not found!</p>;
  }

  return (
    <div className="p-6 text-white max-w-6xl mx-auto">
      {/* 🪙 Coin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-14 h-14 rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold">
              {coin.name}{" "}
              <span className="text-gray-400 uppercase text-lg">
                ({coin.symbol})
              </span>
            </h1>
            <p className="text-gray-400">
              Rank #{coin.market_cap_rank || "N/A"}
            </p>
          </div>
        </div>
        <p className="text-3xl font-bold">
          {symbol}{coin.market_data.current_price[currency].toLocaleString()}
        </p>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-bold">
            ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
          <p
            className={`${
              coin.market_data.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            } text-sm`}
          >
            {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      {/* 🔘 Time Range Selector */}
      <div className="flex justify-end gap-2 mb-4">
        {[1, 7, 30, 90, 180, 365].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              days === d
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {d}d
          </button>
        ))}
      </div>

      {/* 📈 Chart Section */}
      <ChartSection chartData={chartData} coinName={coin.name} />

      {/* 📊 Table Section */}
      <TableView coin={coin} />

      {/* 📝 Description */}
      <div className="mt-8 bg-gray-900 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">About {coin.name}</h2>
        <p
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html:
              coin.description.en?.split(". ").slice(0, 6).join(". ") + ".",
          }}
        />
      </div>
    </div>
  );
}

export default CoinDetail;
