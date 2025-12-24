import Helper from "../api";

// GET /logs/activity
export function getActivityLogs(page = 1, limit = 20, type = "") {
  return Helper.fetchWrapper(`/logs/activity?page=${page}&limit=${limit}&type=${type}`, "GET");
}

// GET /logs/uploads
export function getUploadLogs(page = 1, limit = 20, status = "") {
  return Helper.fetchWrapper(`/logs/uploads?page=${page}&limit=${limit}&status=${status}`, "GET");
}

// GET /logs/access
export function getAccessLogs(page = 1, limit = 20, userId = "") {
  return Helper.fetchWrapper(`/logs/access?page=${page}&limit=${limit}&userId=${userId}`, "GET");
}
