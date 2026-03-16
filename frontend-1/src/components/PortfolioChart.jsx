import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function PortfolioChart({ data }) {

  return (

    <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg">

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="day" stroke="#94a3b8"/>

          <YAxis stroke="#94a3b8"/>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default PortfolioChart;