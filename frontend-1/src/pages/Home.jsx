import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";

function Home() {

  const navigate = useNavigate();

  const handleStartTrading = () => {

    const token = localStorage.getItem("token");

    if (token) {
      navigate("/market");
    } else {
      navigate("/login");
    }

  };

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">

      <Navbar />

      {/* HERO SECTION */}

      <section className="flex items-center justify-between px-20 py-24">

        <div className="max-w-xl">

          <h1 className="text-6xl font-bold leading-tight mb-6">
            Trade Smarter With
            <span className="text-purple-400"> Virtual Markets</span>
          </h1>

          <p className="text-gray-400 mb-8 text-lg">
            Practice trading with simulated funds and experience the market
            without financial risk.
          </p>

          <button
            onClick={handleStartTrading}
            className="bg-purple-500 px-8 py-4 rounded-xl text-lg hover:bg-purple-600 transition shadow-xl"
          >
            Start Trading
          </button>

        </div>

        <div className="float w-105 h-65 bg-linear-to-r from-purple-500 to-indigo-500 rounded-2xl shadow-2xl flex items-center justify-center text-xl font-semibold">
          Live Market Preview
        </div>

      </section>

      {/* STATS SECTION */}

      <section className="grid grid-cols-4 text-center py-14 bg-[#020617]">

        <div>
          <p className="text-4xl font-bold text-purple-400">0.0</p>
          <p className="text-gray-400 mt-2">Spreads From</p>
        </div>

        <div>
          <p className="text-4xl font-bold text-purple-400">1:1000</p>
          <p className="text-gray-400 mt-2">Leverage</p>
        </div>

        <div>
          <p className="text-4xl font-bold text-purple-400">2250+</p>
          <p className="text-gray-400 mt-2">Assets</p>
        </div>

        <div>
          <p className="text-4xl font-bold text-purple-400">24/7</p>
          <p className="text-gray-400 mt-2">Support</p>
        </div>

      </section>

      {/* STEPS SECTION */}

      <section className="bg-white text-black py-24 px-20">

        <h2 className="text-4xl font-bold mb-16 text-center">
          Start Trading In 3 Simple Steps
        </h2>

        <div className="grid grid-cols-3 gap-10">

          <div className="shadow-xl p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">Register</h3>
            <p>Create your trading account.</p>
          </div>

          <div className="shadow-xl p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">Add Funds</h3>
            <p>Get virtual money to trade.</p>
          </div>

          <div className="shadow-xl p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-bold mb-3">Start Trading</h3>
            <p>Buy and sell stocks in simulation.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;