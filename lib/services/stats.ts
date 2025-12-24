import Helper from "../api";

// GET /stats/dashboard
export function getDashboardStats() {
  return Helper.fetchWrapper(`/stats/dashboard`, "GET");
}
