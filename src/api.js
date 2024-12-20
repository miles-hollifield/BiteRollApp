import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchData = async () => {
  const response = await api.get("/api/data");
  return response.data;
};

export default api;
