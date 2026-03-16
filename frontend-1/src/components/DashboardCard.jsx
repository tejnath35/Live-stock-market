function DashboardCard({ title, value }) {
  return (
    <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-lg w-60 text-center">

      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}

export default DashboardCard;