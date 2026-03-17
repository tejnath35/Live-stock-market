import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PortfolioCard from "../components/PortfolioCard";
import { getPortfolioData } from "../services/Api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchPortfolio();

    const refreshPortfolio = () => {
      fetchPortfolio();
    };

    window.addEventListener("portfolio-updated", refreshPortfolio);
    return () => {
      window.removeEventListener("portfolio-updated", refreshPortfolio);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Your Portfolio</h1>
        <p className="text-gray-700 mb-3 font-semibold">Wallet Balance: ₹{walletBalance.toFixed(2)}</p>
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