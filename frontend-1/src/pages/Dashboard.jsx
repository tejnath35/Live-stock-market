import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import PortfolioChart from "../components/PortfolioChart";
import StockChart from "../components/StockChart";
import { getPortfolioData, getStockHistory } from "../services/Api";

function Dashboard() {

  // get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [portfolio, setPortfolio] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [stockHistory, setStockHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historyError, setHistoryError] = useState(null);
  const [walletBalance, setWalletBalance] = useState(12000);

  const [data, setData] = useState({
    portfolioValue: 0,
    walletBalance: 12000,
    profitLoss: 0,
    portfolioGrowth: [],
    selectedStockPriceData: [],
    profitLossHistory: [],
    lastUpdated: null
  });

  const fetchPortfolio = async () => {
    try {
      setError(null);
      setLoading(true);
      const resp = await getPortfolioData();
      const portfolioData = resp.data.portfolio ?? [];
      setPortfolio(portfolioData);

      setWalletBalance(resp.data.walletBalance ?? 0);

      const portfolioValue = portfolioData.reduce((sum, stock) => sum + (stock.currentValue ?? 0), 0);
      const profitLoss = portfolioData.reduce((sum, stock) => sum + (stock.profitLoss ?? 0), 0);

      setData((prev) => {
        const existingGrowth = prev.portfolioGrowth || [];
        const existingProfit = prev.profitLossHistory || [];

        const nextPoint = {
          time: new Date().toLocaleTimeString(),
          value: portfolioValue,
          profitLoss: profitLoss
        };

        return {
          ...prev,
          portfolioValue,
          walletBalance: resp.data.walletBalance ?? prev.walletBalance,
          profitLoss,
          lastUpdated: new Date().toLocaleTimeString(),
          portfolioGrowth: [...existingGrowth, nextPoint].slice(-20),
          profitLossHistory: [...existingProfit, nextPoint].slice(-20)
        };
      });

      if (!selectedSymbol && portfolioData.length > 0) {
        setSelectedSymbol(portfolioData[0].stockSymbol);
      }

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const fetchStockHistory = async (symbol) => {
    if (!symbol) {
      setStockHistory([]);
      setHistoryError(null);
      return;
    }

    try {
      setHistoryError(null);
      const to = Math.floor(Date.now() / 1000);
      const from = to - 365 * 24 * 60 * 60; // Past year instead of 30 days
      const resp = await getStockHistory(symbol, "D", from, to);
      setStockHistory(resp.data.map((item) => ({ time: item.time, price: item.close })));
    } catch (err) {
      setHistoryError(err?.response?.data?.message || err.message || "Failed to load stock history");
      setStockHistory([]);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const intervalId = setInterval(fetchPortfolio, 30000); // refresh every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      fetchStockHistory(selectedSymbol);
    }
    const historyInterval = setInterval(() => {
      if (selectedSymbol) {
        fetchStockHistory(selectedSymbol);
      }
    }, 30000); // refresh stock history every 30 seconds

    return () => clearInterval(historyInterval);
  }, [selectedSymbol]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        <div className="bg-white p-5 rounded-xl shadow mb-10 flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold">Welcome, {user?.name}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Account Status</p>
            <p className="text-green-500 font-semibold">Active</p>
          </div>
        </div>

        {loading && <p className="text-blue-600 mb-4">Loading dashboard data...</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex gap-6 mb-10">
              <DashboardCard title="Portfolio Value" value={`₹${data.portfolioValue.toFixed(2)}`} />
              <DashboardCard title="Wallet Balance" value={`₹${walletBalance.toFixed(2)}`} />
              <DashboardCard title="Profit / Loss" value={`₹${data.profitLoss.toFixed(2)}`} />
            </div>

            <div className="mb-10">
              <label className="block mb-2 font-medium">Select stock for history chart:</label>
              <select
                className="border rounded px-3 py-2" 
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                disabled={portfolio.length === 0}
              >
                {portfolio.map((stock) => (
                  <option key={stock.stockSymbol} value={stock.stockSymbol}>{stock.stockSymbol}</option>
                ))}
              </select>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Portfolio Growth / P&L</h2>
            <PortfolioChart data={data.portfolioGrowth.map((point) => ({
              ...point,
              profit: point.profitLoss > 0 ? point.profitLoss : 0,
              loss: point.profitLoss < 0 ? Math.abs(point.profitLoss) : 0
            }))} />

            <h2 className="text-2xl font-semibold mt-10 mb-4">Selected Stock Price History ({selectedSymbol})</h2>
            {historyError && <p className="text-yellow-600 mb-2">{historyError}</p>}
            <StockChart data={stockHistory} />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;