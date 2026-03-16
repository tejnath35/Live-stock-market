const Transaction = require("../models/Transaction");
const Portfolio = require("../models/Portfolio");

// BUY STOCK
exports.buyStock = async (req, res) => {
  try {
    const { stockSymbol, quantity, price } = req.body;
    const userId = req.user?.id || "testUser";

    const qty = Number(quantity);
    const stockPrice = Number(price);

    // Save transaction
    const transaction = await Transaction.create({
      userId,
      stockSymbol,
      quantity: qty,
      price: stockPrice,
      type: "BUY",
      profitLoss: 0 // No P/L for buy
    });

    // Update portfolio
    let portfolio = await Portfolio.findOne({ userId, stockSymbol });

    if (portfolio) {
      // Update average buy price
      const totalCost = portfolio.buyPrice * portfolio.quantity + stockPrice * qty;
      const totalQty = portfolio.quantity + qty;
      portfolio.buyPrice = totalCost / totalQty;
      portfolio.quantity += qty;
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        userId,
        stockSymbol,
        quantity: qty,
        buyPrice: stockPrice
      });
    }

    res.status(201).json({
      message: "Stock purchased successfully",
      portfolio,
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// SELL STOCK
exports.sellStock = async (req, res) => {
  try {
    const { stockSymbol, quantity, price } = req.body;
    const userId = req.user?.id || "testUser";

    const qty = Number(quantity);
    const stockPrice = Number(price);

    const portfolio = await Portfolio.findOne({ userId, stockSymbol });

    if (!portfolio || portfolio.quantity < qty) {
      return res.status(400).json({
        message: "Not enough stocks to sell"
      });
    }

    // Calculate Profit/Loss
    const profitLoss = (stockPrice - portfolio.buyPrice) * qty;

    portfolio.quantity -= qty;

    if (portfolio.quantity === 0) {
      await portfolio.deleteOne();
    } else {
      await portfolio.save();
    }

    const transaction = await Transaction.create({
      userId,
      stockSymbol,
      quantity: qty,
      price: stockPrice,
      type: "SELL",
      profitLoss
    });

    res.json({
      message: "Stock sold successfully",
      profitLoss,
      transaction
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET PORTFOLIO
exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user?.id || "testUser";
    const portfolio = await Portfolio.find({ userId });

    // Optional: Calculate unrealized P/L for each stock
    const portfolioWithPL = portfolio.map((p) => ({
      stockSymbol: p.stockSymbol,
      quantity: p.quantity,
      buyPrice: p.buyPrice,
      // currentPrice can be passed from frontend or another service
    }));

    res.json({
      count: portfolio.length,
      portfolio: portfolioWithPL
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user?.id || "testUser";
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    res.json({
      count: transactions.length,
      transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LEADERBOARD
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Transaction.aggregate([
      {
        $group: {
          _id: "$userId",
          totalProfit: { $sum: "$profitLoss" },
          totalTrades: { $sum: 1 }
        }
      },
      {
        $sort: { totalProfit: -1 } // Sort by profit descending
      }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};