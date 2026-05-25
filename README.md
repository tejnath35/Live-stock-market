# 📈 Live Stock Market Simulator

Welcome to the **Live Stock Market Simulator**! This is a complete, full-stack MERN (MongoDB, Express, React, Node.js) application designed to simulate live stock trading. Users can create accounts, top-up a virtual wallet, view real-time stock prices, analyze historical charts, execute buy/sell orders, view their transaction logs, and see how they rank against other traders.

---

## 🚀 Key Features

*   **Real-time Stock Tracking**: Powered by the **Finnhub Stock API** with live price quotes, daily highs/lows, percent changes, and historical candle data.
*   **Virtual Portfolio & Wallet**: Start with a default virtual wallet balance of `$10,000`. Manage holdings, buy at live prices, and track average purchase price.
*   **Interactive Charts**: Beautiful, premium visualizations using **Recharts**, showing real-time price trends, historical candles, and portfolio allocations.
*   **Secure Authentication**: JWT-based user login and signup with password encryption via `bcryptjs`.
*   **Leaderboard**: Track your performance against other traders based on stock holding volumes.
*   **Robust Fallbacks**: Smart fallback mechanism that generates realistic, varying synthetic stock data in case the Finnhub API key hits rate limits or is unauthorized.
*   **Tailwind CSS v4 Styling**: Built using Vite and the cutting-edge Tailwind CSS v4 design system.

---

## 📁 Repository Structure

The project is structured as a monorepo containing two main folders:

```
Live-stock-market/
├── Backend/                 # Express API server, MongoDB models, Finnhub integration
│   ├── config/              # Database connection configuration
│   ├── controllers/         # Business logic for auth and trading
│   ├── middleware/          # JWT verification and route guards
│   ├── models/              # Mongoose DB schemas (User, Portfolio, Transaction, Stock)
│   ├── routes/              # Express API endpoints
│   ├── server.js            # Node server startup & static routing
│   └── README.md            # Detailed Backend Guide
│
├── frontend-1/              # React frontend (Vite, Tailwind CSS v4, Recharts)
│   ├── public/              # Static assets and icons
│   ├── src/                 # React application source code
│   │   ├── components/      # Reusable UI widgets (Charts, Cards, Navbar)
│   │   ├── pages/           # High-level page views (Dashboard, Market, Login, etc.)
│   │   ├── services/        # Axios API client connection
│   │   ├── App.jsx          # Route management & state coordination
│   │   └── main.jsx         # React application mounting
│   └── README.md            # Detailed Frontend Guide
│
├── vercel.json              # Main Vercel deployment setup
└── README.md                # This global repository guide
```

---

## ⚡ Quick Start Guide

To run the full stack locally, follow these steps:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tejnath35/Live-stock-market.git
cd Live-stock-market
```

### 2️⃣ Run the Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend/` directory and add your configurations (refer to [Backend README](./Backend/README.md)):
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STOCK_API_KEY=your_finnhub_api_key
   ```
4. Start the backend server (using Nodemon for development):
   ```bash
   npm run dev
   # or normal start
   npm start
   ```

### 3️⃣ Run the Frontend
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend-1
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (optional, defaults to local port 3000):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Launch the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`.

---

## 🔗 Sub-Module Readmes

For granular configuration options, API reference, deployment notes, and code structure, please check the dedicated sub-module READMEs:

*   📖 **[Backend Detailed README](./Backend/README.md)**
*   📖 **[Frontend Detailed README](./frontend-1/README.md)**

---

## 🛠️ Tech Stack Summary

*   **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose ODM](https://mongoosejs.com/)
*   **Backend Server**: [Express.js](https://expressjs.com/) & [Node.js](https://nodejs.org/)
*   **Frontend Engine**: [React 19](https://react.dev/) & [Vite](https://vite.dev/)
*   **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Data Visualization**: [Recharts](https://recharts.org/)
*   **HTTP Client**: [Axios](https://axios-http.com/)
