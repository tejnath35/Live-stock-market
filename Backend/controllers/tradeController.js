const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.buyStock = async (req, res) => {
  try {
    const { userId, stockSymbol, quantity, price } = req.body;

    const user = await User.findById(userId);

    const totalCost = price * quantity;

    if (user.walletBalance < totalCost) {
      return res.json({ message: "Insufficient balance" });
    }

    user.walletBalance -= totalCost;
    await user.save();

    const portfolio = new Portfolio({
      userId,
      stockSymbol,
      quantity,
      buyPrice: price
    });

    await portfolio.save();

    const transaction = new Transaction({
      userId,
      stockSymbol,
      type: "BUY",
      quantity,
      price
    });

    await transaction.save();

    res.json({ message: "Stock purchased successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { userId, stockSymbol, quantity, price } = req.body;

    const portfolio = await Portfolio.findOne({ userId, stockSymbol });

    if (!portfolio || portfolio.quantity < quantity) {
      return res.json({ message: "Not enough stock to sell" });
    }

    portfolio.quantity -= quantity;
    await portfolio.save();

    const user = await User.findById(userId);

    user.walletBalance += price * quantity;
    await user.save();

    const transaction = new Transaction({
      userId,
      stockSymbol,
      type: "SELL",
      quantity,
      price
    });

    await transaction.save();

    res.json({ message: "Stock sold successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
};