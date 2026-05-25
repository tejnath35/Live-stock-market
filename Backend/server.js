const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect Database
connectDB();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);

// Serve static files from React build directory in production
const distPath = path.join(__dirname, "../frontend-1/dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Wildcard route to direct non-API requests back to index.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  // Fallback Home Route in development
  app.get("/", (req, res) => {
    res.send("Stock Market Simulator Backend Running (Frontend not built)");
  });
}

// 404 Handler (for unknown routes - fallback for unmatched /api requests)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});