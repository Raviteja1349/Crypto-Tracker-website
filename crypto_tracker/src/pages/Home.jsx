import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import { fetchMarkets } from "../api/coingecko";


function Home() {
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();
  const { currency, symbol } = useCurrency();

  useEffect(() => {
    const loadCoins = async () => {
      fetchMarkets({ vs_currency: currency }).then(setCoins);
    };
    loadCoins();
  }, [currency]);
  

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {coins.length === 0 ? (
        <p className="text-center text-white">Loading coins...</p>
      ) : (
        coins.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate(`/coin/${coin.id}`)}
            className="bg-gray-900 text-white rounded-lg p-4 shadow-lg hover:scale-105 cursor-pointer transition-transform duration-200"
          >
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-bold">{coin.name}</h2>
                <p className="mt-2 text-xl font-semibold">
                  {symbol}{coin.current_price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">
                  {coin.symbol?.toUpperCase()}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xl font-semibold">
              ${coin.current_price?.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                coin.price_change_percentage_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
