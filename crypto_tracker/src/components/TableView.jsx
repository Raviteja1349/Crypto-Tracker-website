import React from "react";

function TableView({ coin, currency = "usd" }) {
  if (!coin || !coin.market_data) return null;

  const { market_data } = coin;

  return (
    <div className="bg-gray-900 text-white rounded-lg p-4 shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Market Statistics</h2>
      <table className="w-full text-left border-collapse">
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="py-2 text-gray-400">Current Price</td>
            <td>{`$${market_data.current_price[currency].toLocaleString()}`}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 text-gray-400">Market Cap</td>
            <td>{`$${market_data.market_cap[currency].toLocaleString()}`}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 text-gray-400">24h High</td>
            <td>{`$${market_data.high_24h[currency].toLocaleString()}`}</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="py-2 text-gray-400">24h Low</td>
            <td>{`$${market_data.low_24h[currency].toLocaleString()}`}</td>
          </tr>
          <tr>
            <td className="py-2 text-gray-400">Circulating Supply</td>
            <td>{market_data.circulating_supply.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
