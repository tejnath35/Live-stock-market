import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", value: 10000 },
  { day: "Tue", value: 12000 },
  { day: "Wed", value: 11000 },
  { day: "Thu", value: 15000 },
  { day: "Fri", value: 17000 }
];

function PortfolioChart() {
  return (
    <div>
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
    </div>
  );
}

export default PortfolioChart;