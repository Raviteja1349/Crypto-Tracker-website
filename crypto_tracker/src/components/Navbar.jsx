import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useCurrency } from "../context/CurrencyContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const { currency, toggleCurrency } = useCurrency();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            onClick={() => navigate("/")}
          >
            CryptoTracker
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/watchlist" className="hover:text-blue-400">Watchlist</Link>

            <button
              onClick={toggleCurrency}
              className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
            >
              {currency === "usd" ? "₹ INR" : "$ USD"}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {user ? (
              <>
                <span className="text-gray-300 text-sm">
                  Hi, {user.email.split("@")[0]}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="md:hidden flex flex-col space-y-2 bg-gray-800 p-4 rounded-lg mt-2">
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/watchlist" onClick={() => setOpen(false)}>Watchlist</Link>
            <button onClick={toggleCurrency}>
              {currency === "usd" ? "₹ INR" : "$ USD"}
            </button>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
