import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function createWidget(payload) {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return axios.post(`${API_BASE_URL}/create-widget`, payload, {
    headers,
  });
}
