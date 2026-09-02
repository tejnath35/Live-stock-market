function DashboardCard({ title, value }) {
  return (
    <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-5 rounded-xl shadow-lg w-full text-center sm:p-6 sm:w-60">
      <h3 className="text-base font-semibold text-white mb-2 sm:text-lg">
        {title}
      </h3>

      <p className="text-xl font-bold text-white sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;