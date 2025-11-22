import React from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Watchlist() {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const navigate = useNavigate();

  if (watchlist.length === 0) {
    return (
      <div className="text-center text-gray-300 mt-10">
        <p>No coins in your watchlist yet.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Browse Coins
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {watchlist.map((coin) => (
          <div
            key={coin.id}
            onClick={() => navigate(`/coin/${coin.id}`)}
            className="bg-gray-900 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300 relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(coin);
              }}
              className="absolute top-3 right-3 text-yellow-400 text-lg"
            >
              ★
            </button>

            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="font-bold text-lg">{coin.name}</h2>
                <p className="text-gray-400 text-sm">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xl font-semibold">
              ${coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
