import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/market" element={<Market />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;