import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StockCard from "../components/Stockcard";
import { getMarketStocks } from "../services/Api";

function Market() {
  const [market, setMarket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarket = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await getMarketStocks();
      setMarket(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarket();
    const intervalId = setInterval(fetchMarket, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Live Market Data</h1>
        {loading && <p>Loading market data...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {market.map((stock) => (
              <StockCard key={stock.stockSymbol} stock={stock} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Market;