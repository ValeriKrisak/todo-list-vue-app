import axios from "axios";

const api = axios.create({
  baseURL: "https://6695519f4bd61d8314caea14.mockapi.io/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default api;
