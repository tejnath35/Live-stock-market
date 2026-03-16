function Stockcard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition">

      <h2 className="text-xl font-bold">
        Apple
      </h2>

      <p className="text-gray-500 mt-2">
        Price: ₹190
      </p>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Buy
      </button>

    </div>
  );
}

export default Stockcard;