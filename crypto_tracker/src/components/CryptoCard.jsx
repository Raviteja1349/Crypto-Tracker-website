import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function CryptoCard({ coin }) {
  const navigate = useNavigate();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const inList = isInWatchlist(coin.id);

  return (
    <div
      className="bg-gray-900 text-white rounded-lg p-4 shadow-lg hover:scale-105 cursor-pointer transition-transform duration-300 relative"
      onClick={() => navigate(`/coin/${coin.id}`)}
    >
      {/* ⭐ Watchlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent navigation on click
          toggleWatchlist(coin);
        }}
        className={`absolute top-3 right-3 text-lg ${
          inList ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
        }`}
      >
        {inList ? "★" : "☆"}
      </button>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-bold text-lg">{coin.name}</h2>
            <p className="text-sm text-gray-400">
              {coin.symbol.toUpperCase()}
            </p>
          </div>
        </div>
        <span
          className={`font-semibold ${
            coin.price_change_percentage_24h > 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
      </div>

      <div className="mt-3">
        <p className="text-xl font-semibold">
          ${coin.current_price.toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm">
          Market Cap: ${coin.market_cap.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default CryptoCard;
