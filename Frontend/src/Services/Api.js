import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

// example calls
export const getPortfolio = () => API.get("/portfolio");

export const getStocks = () => API.get("/stocks");

export default API;