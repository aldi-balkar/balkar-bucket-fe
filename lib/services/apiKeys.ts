import Helper from "../api";

// GET /api-keys
export function getApiKeys(page = 1, limit = 10) {
  return Helper.fetchWrapper(`/api-keys?page=${page}&limit=${limit}`, "GET");
}

// GET /api-keys/:id
export function getApiKeyDetail(id: string) {
  return Helper.fetchWrapper(`/api-keys/${id}`, "GET");
}

// POST /api-keys
export function createApiKey(data: any) {
  return Helper.fetchWrapper(`/api-keys`, "POST", data);
}

// PATCH /api-keys/:id
export function updateApiKey(id: string, data: any) {
  return Helper.fetchWrapper(`/api-keys/${id}`, "PATCH", data);
}

// DELETE /api-keys/:id
export function deleteApiKey(id: string) {
  return Helper.fetchWrapper(`/api-keys/${id}`, "DELETE");
}
