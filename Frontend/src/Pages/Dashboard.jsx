import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import PortfolioChart from "../components/PortfolioChart";
import StockChart from "../components/StockChart";
import { getDashboardData } from "../Services/Api";

function Dashboard() {

  const [data, setData] = useState({
    portfolioValue: 0,
    walletBalance: 0,
    profitLoss: 0,
    portfolioGrowth: [],
    stockPrice: []
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await getDashboardData();
        setData(res.data);
      } catch (err) {
        console.log("Backend not available");
      }
    };

    fetchData();

  }, []);

  return (
   <div className="min-h-screen w-full bg-linear-to-br from-blue-900 via-sky-800 to-indigo-900 p-20 text-white">
      <h1 className="text-4xl font-bold mb-10">Stock Market Dashboard</h1>

      <div className="flex gap-3 mb-10 mt-5">
        <div>
        <DashboardCard 
          title="Portfolio Value"
          value={`₹${data.portfolioValue}`}
        />
        </div>

        <DashboardCard
          title="Wallet Balance"
          value={`₹${data.walletBalance}`}
        />

        <DashboardCard
          title="Profit / Loss"
          value={`₹${data.profitLoss}`}
        />
      </div>

      <h2>Portfolio Growth</h2>
      <div className="mb-5">
      <PortfolioChart data={data.portfolioGrowth} />
      </div>

      <h2>Stock Price</h2>
      <StockChart data={data.stockPrice} />
    </div>
  );
}

export default Dashboard;