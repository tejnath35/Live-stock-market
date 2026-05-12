import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000/api" : "https://live-stock-market-2mfb.onrender.com/api");

const API = axios.create({
  baseURL: API_URL
});

export const getDashboardData = () => API.get("/dashboard");
export const getMarketStocks = () => API.get("/stocks/market");
export const getStockQuote = (symbol) => API.get(`/stocks/quote?symbol=${symbol}`);
export const getPortfolioData = () => API.get("/stocks/portfolio");
export const getWallet = () => API.get("/stocks/wallet");
export const updateWallet = (amount) => API.post("/stocks/wallet", { amount });
export const getStockHistory = (symbol, resolution = "D", from, to) => {
  const query = new URLSearchParams({ symbol, resolution, from, to });
  return API.get(`/stocks/history?${query.toString()}`);
};

export default API;