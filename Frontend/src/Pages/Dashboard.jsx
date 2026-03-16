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
    <div style={{ padding: "20px" }}>
      <h1>Stock Market Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <DashboardCard
          title="Portfolio Value"
          value={`₹${data.portfolioValue}`}
        />

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
      <PortfolioChart data={data.portfolioGrowth} />

      <h2>Stock Price</h2>
      <StockChart data={data.stockPrice} />
    </div>
  );
}

export default Dashboard;