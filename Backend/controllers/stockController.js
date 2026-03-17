const axios = require("axios");
const Transaction = require("../models/Transaction");
const Portfolio = require("../models/Portfolio");
const User = require("../models/User");

const API_KEY = process.env.STOCK_API_KEY;

const getLiveQuote = async (stockSymbol) => {
  if (!API_KEY) {
    const e = new Error("Missing STOCK_API_KEY in environment");
    e.status = 500;
    throw e;
  }

  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${API_KEY}`
    );

    if (!response.data || typeof response.data.c !== "number") {
      const e = new Error(`Invalid quote for ${stockSymbol}`);
      e.status = 404;
      throw e;
    }

    return response.data;

  } catch (error) {
    const status = error.response?.status || 500;
    const msg = error.response?.data?.error || error.response?.data?.error_description || error.message;

    // handle API limit / unauthorized
    if (status === 429) {
      const err = new Error(`Rate limit reached for Finnhub (${stockSymbol})`);
      err.status = 429;
      throw err;
    }

    if (status === 403 || status === 401) {
      const err = new Error(`Finnhub API key invalid or unauthorized (` + status + `)`);
      err.status = status;
      throw err;
    }

    const err = new Error(`Quote fetch failed for ${stockSymbol}: ${msg}`);
    err.status = status;
    throw err;
  }
};


// ================= BUY STOCK =================

exports.buyStock = async (req, res) => {
  try {
    const { stockSymbol, quantity } = req.body;
    const userId = req.user?.id || "testUser";

    const qty = Number(quantity);

    // Fetch LIVE price
    const quote = await getLiveQuote(stockSymbol);
    const livePrice = quote.c;

    if (!livePrice) {
      return res.status(400).json({ message: "Invalid stock symbol" });
    }

    const user = req.user ? await User.findById(req.user.id) : null;

    if (user && user.walletBalance < livePrice * qty) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Save transaction
    const transaction = await Transaction.create({
      userId,
      stockSymbol,
      quantity: qty,
      price: livePrice,
      type: "BUY",
      profitLoss: 0
    });

    let portfolio = await Portfolio.findOne({ userId, stockSymbol });

    if (portfolio) {

      const totalCost =
        portfolio.buyPrice * portfolio.quantity + livePrice * qty;

      const totalQty = portfolio.quantity + qty;

      portfolio.buyPrice = totalCost / totalQty;
      portfolio.quantity = totalQty;

      await portfolio.save();

    } else {

      portfolio = await Portfolio.create({
        userId,
        stockSymbol,
        quantity: qty,
        buyPrice: livePrice
      });

    }

    if (user) {
      user.walletBalance -= livePrice * qty;
      await user.save();
    }

    res.status(201).json({
      message: "Stock purchased successfully",
      livePrice,
      walletBalance: user?.walletBalance,
      portfolio,
      transaction
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message });

  }
};



// ================= SELL STOCK =================

exports.sellStock = async (req, res) => {
  try {

    const { stockSymbol, quantity } = req.body;
    const userId = req.user?.id || "testUser";

    const qty = Number(quantity);

    const quote = await getLiveQuote(stockSymbol);
    const livePrice = quote.c;

    const user = req.user ? await User.findById(req.user.id) : null;
    const portfolio = await Portfolio.findOne({ userId, stockSymbol });

    if (!portfolio || portfolio.quantity < qty) {
      return res.status(400).json({
        message: "Not enough stocks to sell"
      });
    }

    const profitLoss = (livePrice - portfolio.buyPrice) * qty;

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
      price: livePrice,
      type: "SELL",
      profitLoss
    });

    if (user) {
      user.walletBalance += livePrice * qty;
      await user.save();
    }

    res.json({
      message: "Stock sold successfully",
      livePrice,
      profitLoss,
      walletBalance: user?.walletBalance,
      transaction
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message });

  }
};



// ================= GET PORTFOLIO =================

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user?.id || "testUser";
    const user = req.user ? await User.findById(req.user.id) : null;

    const portfolio = await Portfolio.find({ userId });

    const updatedPortfolio = await Promise.all(

      portfolio.map(async (stock) => {
        try {
          const quote = await getLiveQuote(stock.stockSymbol);
          const livePrice = quote.c;
          const currentValue = livePrice * stock.quantity;
          const investedValue = stock.buyPrice * stock.quantity;

          return {
            ...stock._doc,
            livePrice,
            currentValue,
            profitLoss: currentValue - investedValue
          };
        } catch (err) {
          const livePrice = stock.buyPrice;
          const currentValue = livePrice * stock.quantity;
          const investedValue = stock.buyPrice * stock.quantity;
          return {
            ...stock._doc,
            livePrice,
            currentValue,
            profitLoss: currentValue - investedValue,
            quoteError: err.message
          };
        }
      })

    );

    const walletBalance = user ? user.walletBalance : undefined;
    res.json({ walletBalance, portfolio: updatedPortfolio });

  } catch (error) {

    res.status(error.status || 500).json({ message: error.message });

  }
};


// ================= GET QUOTE =================

exports.getQuote = async (req, res) => {
  try {
    const stockSymbol = req.query.symbol;

    if (!stockSymbol) {
      return res.status(400).json({ message: "Missing symbol query parameter" });
    }

    const quote = await getLiveQuote(stockSymbol);

    res.json({
      stockSymbol,
      currentPrice: quote.c,
      highPrice: quote.h,
      lowPrice: quote.l,
      openPrice: quote.o,
      prevClose: quote.pc,
      change: quote.d,
      percentChange: quote.dp
    });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};


// ================= GET STOCK HISTORY =================

exports.getStockHistory = async (req, res) => {
  let stockSymbol = req.query.symbol;
  try {
    const resolution = req.query.resolution || "D";
    const from = Number(req.query.from) || Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
    const to = Number(req.query.to) || Math.floor(Date.now() / 1000);

    if (!stockSymbol) {
      return res.status(400).json({ message: "Missing symbol query parameter" });
    }

    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
    );

    if (response.data.s !== "ok") {
      return res.status(400).json({ message: "Unable to fetch candle data" });
    }

    const history = response.data.t.map((timestamp, index) => ({
      time: new Date(timestamp * 1000).toLocaleDateString(),
      open: response.data.o[index],
      high: response.data.h[index],
      low: response.data.l[index],
      close: response.data.c[index],
      volume: response.data.v[index]
    }));

    res.json(history);
  } catch (error) {
    console.error('getStockHistory error:', error);
    const status = error.response?.status || 500;
    console.error('getStockHistory status:', status, 'message:', error.message);

    if (status === 401 || status === 403) {
      // Finnhub key unauthorized, provide synthetic fallback history so charts still render.
      const fallbackPrice = await (async () => {
        try {
          const quote = await getLiveQuote(stockSymbol);
          return quote.c;
        } catch (e) {
          return 0;
        }
      })();

      const fallbackHistory = Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - index));
        return {
          time: date.toLocaleDateString(),
          open: fallbackPrice,
          high: fallbackPrice,
          low: fallbackPrice,
          close: fallbackPrice,
          volume: 0
        };
      });

      return res.json(fallbackHistory);
    }

    res.status(status).json({ message: error.response?.data?.error || error.message });
  }
};


// ================= GET MARKET DATA =================

exports.getMarketData = async (req, res) => {
  try {
    const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "FB", "JPM", "V", "NFLX"];

    const marketData = await Promise.all(
      symbols.map(async (stockSymbol) => {
        try {
          const quote = await getLiveQuote(stockSymbol);
          return {
            stockSymbol,
            currentPrice: quote.c,
            change: quote.d,
            percentChange: quote.dp,
            highPrice: quote.h,
            lowPrice: quote.l,
            openPrice: quote.o,
            prevClose: quote.pc
          };
        } catch (error) {
          return {
            stockSymbol,
            error: error.message,
            status: error.status || 500
          };
        }
      })
    );

    res.json(marketData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET TRANSACTIONS =================

exports.getTransactions = async (req, res) => {
  try {

    const userId = req.user?.id || "testUser";

    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};



// ================= LEADERBOARD =================

exports.getLeaderboard = async (req, res) => {
  try {

    const portfolios = await Portfolio.aggregate([
      {
        $group: {
          _id: "$userId",
          totalStocks: { $sum: "$quantity" }
        }
      },
      { $sort: { totalStocks: -1 } }
    ]);

    res.json(portfolios);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};