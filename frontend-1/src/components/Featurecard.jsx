function Featurecard({ title, text }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 text-center hover:scale-105 transition">

      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <p className="text-gray-600">{text}</p>

    </div>
  );
}

export default Featurecard;