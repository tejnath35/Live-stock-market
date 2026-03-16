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
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        marginTop: "20px"
      }}
    >
      

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tick={{ fill: "#cbd5f5" }}
          />

          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#cbd5f5" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "none",
              borderRadius: "8px",
              color: "white"
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PortfolioChart;