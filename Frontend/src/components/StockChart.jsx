import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { time: "10AM", price: 120 },
  { time: "11AM", price: 140 },
  { time: "12PM", price: 135 },
  { time: "1PM", price: 160 },
  { time: "2PM", price: 170 }
];

function StockChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <Line type="monotone" dataKey="price" stroke="#82ca9d" />
    </LineChart>
  );
}

export default StockChart;