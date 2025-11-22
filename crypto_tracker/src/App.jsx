import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoinDetail from "./pages/CoinDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";  // ✅ Must be imported
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* ✅ This works now */}
      </Routes>
    </>
  );
}

export default App;
