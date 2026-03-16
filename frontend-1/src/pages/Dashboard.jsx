import { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import PortfolioChart from "../components/PortfolioChart";
import StockChart from "../components/StockChart";

function Dashboard() {

  // get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [data] = useState({

    portfolioValue: 25000,
    walletBalance: 12000,
    profitLoss: 3200,

    portfolioGrowth: [
      { day: "Mon", value: 12000 },
      { day: "Tue", value: 15000 },
      { day: "Wed", value: 17000 },
      { day: "Thu", value: 21000 },
      { day: "Fri", value: 25000 }
    ],

    stockPrice: [
      { time: "10:00", price: 150 },
      { time: "11:00", price: 165 },
      { time: "12:00", price: 172 },
      { time: "13:00", price: 180 },
      { time: "14:00", price: 195 }
    ]

  });

  return(

  <div className="bg-gray-100 min-h-screen">

    <Navbar/>

    <div className="p-10">

      {/* DASHBOARD TITLE */}
      <h1 className="text-4xl font-bold mb-4">
        Dashboard
      </h1>

      {/* USER INFO */}
      <div className="bg-white p-5 rounded-xl shadow mb-10 flex justify-between items-center">

        <div>
          <p className="text-xl font-semibold">
            Welcome, {user?.name}
          </p>
          <p className="text-gray-500">
            {user?.email}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-500 text-sm">Account Status</p>
          <p className="text-green-500 font-semibold">Active</p>
        </div>

      </div>

      {/* DASHBOARD CARDS */}
      <div className="flex gap-6 mb-10">

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

      {/* PORTFOLIO CHART */}
      <h2 className="text-2xl font-semibold mb-4">
        Portfolio Growth
      </h2>

      <PortfolioChart data={data.portfolioGrowth}/>

      {/* STOCK CHART */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Stock Price
      </h2>

      <StockChart data={data.stockPrice}/>

    </div>

  </div>

  )

}

export default Dashboard