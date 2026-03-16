function Portfoliocard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">

      <h2 className="text-xl font-bold">
        Tesla
      </h2>

      <p className="text-gray-500 mt-2">
        Quantity: 3
      </p>

      <p className="text-green-600">
        Profit: +₹300
      </p>

      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
        Sell
      </button>

    </div>
  );
}

export default Portfoliocard;