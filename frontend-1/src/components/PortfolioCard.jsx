import { useState } from "react";
import API from "../services/Api";

function PortfolioCard({ stock }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const profitLoss = stock?.profitLoss?.toFixed(2) ?? 0;
  const changeClass = profitLoss >= 0 ? "text-green-600" : "text-red-600";

  const onSell = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      setPending(true);
      await API.post("/stocks/sell", {
        stockSymbol: stock.stockSymbol,
        quantity: 1
      });
      window.dispatchEvent(new Event("portfolio-updated"));
      setPending(false);
      setSuccessMessage(`Sold 1 share of ${stock.stockSymbol}`);
    } catch (err) {
      setPending(false);
      setError(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
      <h2 className="text-xl font-bold">{stock.stockSymbol}</h2>
      <p className="text-gray-700 mt-2">Quantity: {stock.quantity}</p>
      <p className="text-gray-700">Buy Price: ₹{stock.buyPrice?.toFixed(2)}</p>
      <p className="text-gray-700">Live Price: ₹{stock.livePrice?.toFixed(2)}</p>
      <p className={changeClass}>Profit/Loss: ₹{profitLoss}</p>
      <p className="text-gray-500">Current Value: ₹{(stock.currentValue ?? 0).toFixed(2)}</p>

      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
        onClick={onSell}
        disabled={pending || stock.quantity <= 0}
      >
        {pending ? "Selling..." : "Sell 1"}
      </button>

      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default PortfolioCard;