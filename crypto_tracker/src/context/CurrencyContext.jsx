import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // Default: USD
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");

  const toggleCurrency = () => {
    if (currency === "usd") {
      setCurrency("inr");
      setSymbol("₹");
    } else {
      setCurrency("usd");
      setSymbol("$");
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, symbol, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
