import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PortfolioCard from "../components/PortfolioCard";
import { getPortfolioData, updateWallet } from "../services/Api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpMessage, setTopUpMessage] = useState(null);
  const [topUpError, setTopUpError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getPortfolioData();
      setWalletBalance(response.data.walletBalance ?? 0);
      setPortfolio(response.data.portfolio ?? []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTopUp = async (e) => {
    e.preventDefault();
    setTopUpError(null);
    setTopUpMessage(null);
    setTopUpLoading(true);

    try {
      const amount = Number(topUpAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const response = await updateWallet(amount);
      setWalletBalance(response.data.walletBalance);
      setTopUpMessage(response.data.message || "Wallet topped up successfully");
      setTopUpAmount(0);
      fetchPortfolio();
    } catch (err) {
      setTopUpError(err?.response?.data?.message || err.message);
    } finally {
      setTopUpLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();

    const interval = setInterval(fetchPortfolio, 15000); // refresh every 15s
    const refreshPortfolio = () => {
      fetchPortfolio();
    };

    window.addEventListener("portfolio-updated", refreshPortfolio);
    return () => {
      clearInterval(interval);
      window.removeEventListener("portfolio-updated", refreshPortfolio);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
        <p className="text-gray-700 mb-3 font-semibold">Wallet Balance: ₹{walletBalance.toFixed(2)}</p>
        <form onSubmit={handleTopUp} className="mb-4">
          <label className="block mb-2 font-medium">Top-up Virtual Wallet</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="border rounded px-3 py-2"
              placeholder="Amount"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={topUpLoading}
            >
              {topUpLoading ? "Processing..." : "Top Up"}
            </button>
          </div>
          {topUpMessage && <p className="text-green-600 mt-2">{topUpMessage}</p>}
          {topUpError && <p className="text-red-600 mt-2">{topUpError}</p>}
        </form>

        {loading && <p>Loading portfolio...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && portfolio.length === 0 && (
          <p className="text-gray-500">No holdings found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((stock) => (
            <PortfolioCard key={stock.stockSymbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;