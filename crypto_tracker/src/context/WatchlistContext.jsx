import React, { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // ✅ Load from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  // ✅ Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // ✅ Add or remove coins
  const toggleWatchlist = (coin) => {
    const exists = watchlist.find((c) => c.id === coin.id);
    if (exists) {
      setWatchlist(watchlist.filter((c) => c.id !== coin.id));
    } else {
      setWatchlist([...watchlist, coin]);
    }
  };

  const isInWatchlist = (id) => watchlist.some((c) => c.id === id);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, toggleWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
