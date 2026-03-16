function Walletcard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">

      <h3 className="text-gray-500">{title}</h3>

      <p className="text-3xl font-bold mt-3">{value}</p>

    </div>
  );
}

export default Walletcard;