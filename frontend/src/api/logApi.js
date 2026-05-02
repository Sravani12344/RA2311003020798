import { apiClient } from "./client.js";

export async function fetchLogs() {
  const response = await apiClient.get("/logs");
  return response.data.logs;
}

export async function sendLog(payload) {
  const response = await apiClient.post("/logs", payload);
  return response.data;
}
