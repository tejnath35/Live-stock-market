const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  stockSymbol: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  profitLoss: {
    type: Number,
    default: 0 // Buy transactions will have 0, sell will have calculated value
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);