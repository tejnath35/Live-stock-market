const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  stockSymbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  buyPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);