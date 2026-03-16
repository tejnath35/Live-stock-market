import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

export const getDashboardData = () => API.get("/dashboard");

export default API;