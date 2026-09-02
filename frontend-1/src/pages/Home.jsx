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

      <section className="flex flex-col-reverse gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-20 lg:py-24">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-tight mb-6 sm:text-5xl lg:text-6xl">
            Trade Smarter With
            <span className="text-purple-400"> Virtual Markets</span>
          </h1>

          <p className="text-gray-400 mb-8 text-base sm:text-lg">
            Practice trading with simulated funds and experience the market
            without financial risk.
          </p>

          <button
            onClick={handleStartTrading}
            className="bg-purple-500 px-6 py-3 rounded-xl text-base font-semibold hover:bg-purple-600 transition shadow-xl sm:px-8 sm:py-4 sm:text-lg"
          >
            Start Trading
          </button>
        </div>

        <div className="float w-full max-w-md h-52 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-2xl flex items-center justify-center text-lg font-semibold text-center px-4 lg:w-[28rem] lg:h-[16rem] lg:text-xl">
          Live Market Preview
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6 py-10 text-center bg-[#020617] sm:grid-cols-4 sm:py-14">
        <div>
          <p className="text-3xl font-bold text-purple-400 sm:text-4xl">0.0</p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">Spreads From</p>
        </div>

        <div>
          <p className="text-3xl font-bold text-purple-400 sm:text-4xl">1:1000</p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">Leverage</p>
        </div>

        <div>
          <p className="text-3xl font-bold text-purple-400 sm:text-4xl">2250+</p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">Assets</p>
        </div>

        <div>
          <p className="text-3xl font-bold text-purple-400 sm:text-4xl">24/7</p>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">Support</p>
        </div>
      </section>

      <section className="bg-white text-black py-14 px-4 sm:py-24 sm:px-20">
        <h2 className="text-3xl font-bold mb-10 text-center sm:text-4xl sm:mb-16">
          Start Trading In 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10">
          <div className="shadow-xl p-6 rounded-xl hover:scale-[1.01] transition sm:p-8">
            <h3 className="text-xl font-bold mb-3">Register</h3>
            <p>Create your trading account.</p>
          </div>

          <div className="shadow-xl p-6 rounded-xl hover:scale-[1.01] transition sm:p-8">
            <h3 className="text-xl font-bold mb-3">Add Funds</h3>
            <p>Get virtual money to trade.</p>
          </div>

          <div className="shadow-xl p-6 rounded-xl hover:scale-[1.01] transition sm:p-8">
            <h3 className="text-xl font-bold mb-3">Start Trading</h3>
            <p>Buy and sell stocks in simulation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;