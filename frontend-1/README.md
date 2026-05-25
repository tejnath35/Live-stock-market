# 🎨 Live Stock Market Simulator - Frontend

Welcome to the client-side React interface of the **Live Stock Market Simulator**. Built using the power of **React 19**, **Vite**, **Tailwind CSS v4**, and **Recharts**, this dashboard offers an immersive, real-time, glassmorphic trading simulator.

---

## ✨ Features & Visual Systems

*   **⚡ Lightning Fast HMR**: Leverages Vite's instantaneous hot-module replacement for fluid developer cycles.
*   **📈 Rich Visual Analytics**: Renders high-fidelity stock performance history charts and user portfolio allocation pie-charts using **Recharts**.
*   **🎨 Next-gen Styling**: Styled with **Tailwind CSS v4** implementing dark modes, vibrant neon accent colors, modern typography, custom animations, and clean responsive grids.
*   **🔒 Auth state persistency**: Keeps users signed in via `localStorage` JWT storage, coupled with custom Axios Interceptors that automatically inject Bearer tokens on outgoing API requests.
*   **🧭 Single Page Routing**: Handled elegantly via **React Router v7** for snappy views transition.

---

## 📁 Code Architecture

All client code is modularized within the `src/` directory:

```
frontend-1/src/
├── components/
│   ├── DashboardCard.jsx    # Metric panel for high-level summaries
│   ├── Featurecard.jsx      # Marketing widgets shown on the Home landing page
│   ├── Navbar.jsx           # Dynamic header showing live cash balance, routes, & auth triggers
│   ├── PortfolioCard.jsx    # Table of owned stocks showing live value and calculated gains/losses
│   ├── PortfolioChart.jsx   # Visual representation of asset allocation (Recharts Pie Chart)
│   ├── StockChart.jsx       # Advanced historical candlestick/line chart for ticker analysis
│   ├── Stockcard.jsx        # Buy/Sell panels complete with transaction form controls
│   └── Walletcard.jsx       # Custom wallet deposit terminal
│
├── pages/
│   ├── Home.jsx             # Visual showcase landing page
│   ├── Login.jsx            # Sleek, glassmorphic login gate
│   ├── Signup.jsx           # New user registration onboarding
│   ├── Dashboard.jsx        # User central terminal showing net worth & latest trends
│   ├── Market.jsx           # 20-symbol stock market terminal with real-time tickers and search
│   └── Portfolio.jsx        # Deep analytical dive into asset value distribution
│
├── services/
│   └── Api.js               # Axios wrapper configured with endpoint routes & token injectors
│
├── App.jsx                  # React Router core controller & user session sync
├── index.css                # Tailwind CSS imports & global baseline styling
└── main.jsx                 # Client app mounting file
```

---

## 📡 API Services (`services/Api.js`)

The React frontend communicates with the server via the Axios API helper. It automatically reads your `token` from `localStorage` and embeds it in the headers:

```javascript
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});
```

### Key API Mappings:
*   `getDashboardData()` ➔ `GET /api/dashboard`
*   `getMarketStocks()` ➔ `GET /api/stocks/market`
*   `getStockQuote(symbol)` ➔ `GET /api/stocks/quote?symbol=${symbol}`
*   `getPortfolioData()` ➔ `GET /api/stocks/portfolio`
*   `getWallet()` ➔ `GET /api/stocks/wallet`
*   `updateWallet(amount)` ➔ `POST /api/stocks/wallet`
*   `getStockHistory(symbol, resolution, from, to)` ➔ `GET /api/stocks/history?...`

---

## ⚙️ Customizing Environment Variables

If your backend is deployed externally, you can specify its endpoint inside `.env` in the `frontend-1/` root folder:

```env
VITE_API_URL=https://your-backend-api.com/api
```

*Note: If no env variable is specified, the application defaults to `http://localhost:3000/api` during local development.*

---

## 🛠️ Run Frontend Locally

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```
    *The site will be hosted locally at `http://localhost:5173`.*

3.  **Build production assets**:
    ```bash
    npm run build
    ```
    *This creates static optimized files inside the `dist/` directory, ready to be hosted by static providers or served directly by your Express backend.*

4.  **Preview production build**:
    ```bash
    npm run preview
    ```
