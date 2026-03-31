const express = require("express");
const router = express.Router();

const {
  buyStock,
  sellStock,
  getPortfolio,
  getWallet,
  updateWallet,
  getTransactions,
  getLeaderboard,
  getQuote,
  getMarketData,
  getStockHistory
} = require("../controllers/stockController");

router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.get("/portfolio", getPortfolio);
router.get("/wallet", getWallet);
router.post("/wallet", updateWallet);
router.get("/transactions", getTransactions);
router.get("/leaderboard", getLeaderboard);
router.get("/quote", getQuote);
router.get("/market", getMarketData);
router.get("/history", getStockHistory);

module.exports = router;