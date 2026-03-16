import { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import PortfolioChart from "../components/PortfolioChart";
import StockChart from "../components/StockChart";

function Dashboard() {

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

      <h1 className="text-4xl font-bold mb-10">
        Dashboard
      </h1>

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

      <h2 className="text-2xl font-semibold mb-4">
        Portfolio Growth
      </h2>

      <PortfolioChart data={data.portfolioGrowth}/>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Stock Price
      </h2>

      <StockChart data={data.stockPrice}/>

    </div>

  </div>

  )

}

export default Dashboard