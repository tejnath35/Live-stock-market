const express = require("express");
const router = express.Router();

const {
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
  getLeaderboard
} = require("../controllers/stockController");

router.post("/buy", buyStock);
router.post("/sell", sellStock);
router.get("/portfolio", getPortfolio);
router.get("/transactions", getTransactions);
router.get("/leaderboard", getLeaderboard);

module.exports = router;