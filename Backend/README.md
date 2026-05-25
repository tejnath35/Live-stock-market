# 🖥️ Live Stock Market Simulator - Backend

Welcome to the backend engine of the **Live Stock Market Simulator**. This server is built using **Node.js**, **Express.js**, and **MongoDB** (via Mongoose ODM). It handles user authentication, virtual wallet tracking, secure execution of trades, database transactions, and manages communication with the **Finnhub API** for live financial stock data.

---

## 🔑 Environment Configuration

Create a file named `.env` in the `Backend/` directory and populate it with the following environment variables:

```env
# Server Port
PORT=3000

# MongoDB URI (Atlas or Local)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name

# JWT Token Secret for Auth
JWT_SECRET=your_jwt_signing_secret_key

# Finnhub API Key (Get a free key from https://finnhub.io/)
STOCK_API_KEY=your_finnhub_api_token
```

---

## 🗄️ Database Models (MongoDB / Mongoose)

The backend utilizes four main Mongoose schemas to orchestrate the database:

### 1️⃣ User (`models/User.js`)
Stores user profiles, credentials, and virtual wallet cash.
*   `name` (*String, Required*): The display name.
*   `email` (*String, Required, Unique*): User login email.
*   `password` (*String, Required*): Salted hash of the user's password.
*   `walletBalance` (*Number, Default: 10000*): Virtual cash available to purchase stocks.

### 2️⃣ Portfolio (`models/Portfolio.js`)
Tracks the current stock assets owned by each user.
*   `userId` (*String, Required*): Foreign key referencing the `User`.
*   `stockSymbol` (*String, Required*): The stock ticker (e.g., `"AAPL"`, `"TSLA"`).
*   `quantity` (*Number, Default: 0*): Volume of stock currently owned.
*   `buyPrice` (*Number, Required*): The weighted average cost basis of the stock.

### 3️⃣ Transaction (`models/Transaction.js`)
Keeps an immutable history of all trading activities.
*   `userId` (*String, Required*): Reference to the user who executed the trade.
*   `stockSymbol` (*String, Required*): The stock ticker symbol.
*   `type` (*String, Enum: ["BUY", "SELL"], Required*): The trade action.
*   `quantity` (*Number, Required*): The volume of stocks traded.
*   `price` (*Number, Required*): The price per unit at execution.
*   `profitLoss` (*Number, Default: 0*): Realized gain or loss (calculated during `"SELL"` trades).
*   `date` (*Date, Default: Date.now*): Timestamp of the trade.

### 4️⃣ Stock (`models/Stock.js`)
*   Provides schema structures for standalone stock references.

---

## 📡 REST API Documentation

All routes are prefixed by `/api`. Routes marked with 🔒 require an authentication token passed in the headers.

### 🔓 Authentication Endpoints (`/api/auth`)

#### 📝 Register User
*   **Method / Route**: `POST /api/auth/register`
*   **Body (JSON)**:
    ```json
    {
      "name": "Alex",
      "email": "alex@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response**: Registers a new user and returns success message.

#### 🔑 Login User
*   **Method / Route**: `POST /api/auth/login`
*   **Body (JSON)**:
    ```json
    {
      "email": "alex@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response**: Returns user metadata and JWT token. Copy the token for subsequent requests.

#### 🔄 Forgot Password
*   **Method / Route**: `POST /api/auth/forgot-password`
*   **Body (JSON)**:
    ```json
    {
      "email": "alex@example.com"
    }
    ```

---

### 📈 Trading & Stock Endpoints (`/api/stocks`)

*Note: In the backend, user authentication is managed via `optionalAuthMiddleware`, which defaults to a virtual user `"testUser"` if no auth token is provided (for easy local testing).*

#### 🔒 Get Portfolio
*   **Method / Route**: `GET /api/stocks/portfolio`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Description**: Returns user's stock holdings, automatically calculated with *real-time live prices*, current valuation, and running profit/losses.

#### 🔒 Buy Stock
*   **Method / Route**: `POST /api/stocks/buy`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Body (JSON)**:
    ```json
    {
      "stockSymbol": "AAPL",
      "quantity": 5
    }
    ```
*   **Description**: Pulls the *live* stock quote, validates user wallet balance, processes trade, recalculates the average buy cost in `Portfolio`, deducts funds from the `User` wallet, and registers a `Transaction`.

#### 🔒 Sell Stock
*   **Method / Route**: `POST /api/stocks/sell`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Body (JSON)**:
    ```json
    {
      "stockSymbol": "AAPL",
      "quantity": 2
    }
    ```
*   **Description**: Fetches live price, verifies ownership volume, registers profit/loss, updates or deletes holding, refunds funds into the user's wallet, and logs a trade.

#### 🔒 Get Wallet Balance
*   **Method / Route**: `GET /api/stocks/wallet`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Response**: `{ "walletBalance": 8750.50 }`

#### 🔒 Deposit Virtual Cash (Wallet Top-up)
*   **Method / Route**: `POST /api/stocks/wallet`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Body (JSON)**:
    ```json
    {
      "amount": 5000
    }
    ```
*   **Response**: Adds virtual funds to the wallet.

#### 🔒 Get Transaction Logs
*   **Method / Route**: `GET /api/stocks/transactions`
*   **Headers**: `Authorization: Bearer <your_jwt_token>`
*   **Description**: Returns a list of all buy/sell transactions sorted by the latest trades.

#### 🔓 Get Market Price List
*   **Method / Route**: `GET /api/stocks/market`
*   **Description**: Fetches current quotes for 20 major indices/symbols (AAPL, MSFT, GOOGL, NVDA, TSLA, etc.).

#### 🔓 Get Live Stock Quote
*   **Method / Route**: `GET /api/stocks/quote?symbol=AAPL`
*   **Response**: Returns current price, change, percent change, open, high, low, and previous close.

#### 🔓 Get Stock History (Candle Data)
*   **Method / Route**: `GET /api/stocks/history?symbol=AAPL&resolution=D`
*   **Description**: Returns stock historical candles for visualization in the charting engine.

#### 🔓 Leaderboard
*   **Method / Route**: `GET /api/stocks/leaderboard`
*   **Description**: Returns aggregate trade leaders based on total active holdings volume.

---

## ⚡ Architectural Highlights

1.  **Rolling Cache Window**: To stay within the free-tier Finnhub rate limits (30 requests/minute), the server features an internal quote cache with a **7-second Time-To-Live (TTL)** window. This guarantees immediate frontend feedback while dramatically reducing network calls.
2.  **Smart Synthetic Fallback**: If the Finnhub API key is not set, unauthorized (401/403), or rate limits are reached (429), the server seamlessly falls back to a **high-fidelity synthetic quote engine**. The engine calculates realistic price variations (2-6% variance with random walks) so charts, trading, and portfolios function beautifully in a disconnected or sandbox environment.
3.  **Unified Production Routing**: When built, the Express app is configured to serve the React assets directly from `../frontend-1/dist`. Any wildcard route not matched by `/api` is immediately redirected back to React, enabling seamless unified deployment (e.g., on Render or Vercel).

---

## 🛠️ Run Backend Locally

Install dependencies:
```bash
npm install
```

Start in development mode (with hot-reload via nodemon):
```bash
npm run dev
```

Start in production mode:
```bash
npm start
```
