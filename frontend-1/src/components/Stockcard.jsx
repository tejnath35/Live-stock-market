import { useState } from "react";
import API from "../services/Api";

function Stockcard({ stock }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const onBuy = async () => {
    try {
      setError(null);
      setPending(true);
      // default buy 1 share; modify as needed
      await API.post("/stocks/buy", {
        stockSymbol: stock.stockSymbol,
        quantity: 1
      });
      setPending(false);
      window.dispatchEvent(new Event("portfolio-updated"));
      alert(`Bought 1 share of ${stock.stockSymbol} at ${stock.currentPrice}`);
    } catch (err) {
      setPending(false);
      setError(err?.response?.data?.message || err.message);
    }
  };

  const changeClass = stock.percentChange >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition">
      <h2 className="text-xl font-bold">{stock.stockSymbol}</h2>

      {stock.error ? (
        <p className="text-red-600 mt-3">{stock.error}</p>
      ) : (
        <>
          <p className="text-gray-700 mt-2">
            Price: ${stock.currentPrice?.toFixed(2) ?? "-"}
          </p>

          <p className={`mt-1 ${changeClass}`}>
            {stock.change?.toFixed(2) ?? "0.00"} ({stock.percentChange?.toFixed(2) ?? "0.00"}%)
          </p>
        </>
      )}

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        onClick={onBuy}
        disabled={pending || !!stock.error}
      >
        {stock.error ? "Disabled" : pending ? "Buying..." : "Buy 1"}
      </button>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default Stockcard;