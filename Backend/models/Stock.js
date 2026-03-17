const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  userId: String,
  stockSymbol: String,
  quantity: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Stock", stockSchema);