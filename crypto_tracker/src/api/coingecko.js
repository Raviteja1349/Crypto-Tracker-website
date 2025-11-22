import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

export const fetchMarkets = async ({
  vs_currency = "usd",
  order = "market_cap_desc",
  per_page = 20,
  page = 1,
  sparkline = false,
} = {}) => {
  try {
    const { data } = await api.get("/coins/markets", {
      params: {
        vs_currency,
        order,
        per_page,
        page,
        sparkline,
        price_change_percentage: "1h,24h,7d",
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching market data:", error);
    return [];
  }
};

export const fetchCoin = async (id) => {
  try {
    const { data } = await api.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return data;
  } catch (error) {
    console.error(`❌ Error fetching coin details (${id}):`, error);
    return null;
  }
};

export const fetchChart = async (id, days = 7, vs_currency = "usd") => {
  try {
    const { data } = await api.get(`/coins/${id}/market_chart`, {
      params: { vs_currency, days },
    });
    return data.prices;
  } catch (error) {
    console.error(`❌ Error fetching chart for ${id}:`, error);
    return [];
  }
};
