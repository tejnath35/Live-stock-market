import Navbar from "../components/Navbar";
import PortfolioCard from "../components/PortfolioCard";

function Portfolio() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="grid grid-cols-2 gap-8 p-10">

        <PortfolioCard />
        <PortfolioCard />

      </div>

    </div>
  );
}

export default Portfolio;