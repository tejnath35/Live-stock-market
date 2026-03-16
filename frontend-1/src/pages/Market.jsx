import Navbar from "../components/Navbar";
import StockCard from "../components/Stockcard";

function Market() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="grid grid-cols-3 gap-8 p-10">

        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />

      </div>

    </div>
  );
}

export default Market;