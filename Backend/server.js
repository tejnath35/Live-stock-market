const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect Database
connectDB();


// Home Route
app.get("/", (req, res) => {
  res.send("Stock Market Simulator Backend Running");
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);


// 404 Handler (for unknown routes)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});