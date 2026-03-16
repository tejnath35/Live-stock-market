import DashboardCard from "../components/DashboardCard";
import PortfolioChart from "../components/PortfolioChart";
import StockChart from "../components/StockChart";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-3xl mb-10">📊 Stock Market Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <DashboardCard title="Portfolio Value" value="₹25,000" />
        <DashboardCard title="Wallet Balance" value="₹10,000" />
        <DashboardCard title="Profit / Loss" value="+₹3,200" />
      </div>

      <h2 style={{ marginTop: "40px" }}>Portfolio Growth</h2>
      <PortfolioChart />

      <h2 style={{ marginTop: "40px" }}>Stock Price</h2>
      <StockChart />
    </div>
  );
}

export default Dashboard;