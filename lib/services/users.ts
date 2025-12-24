import Helper from "../api";

// GET /users
export function getUsers(page = 1, limit = 10, role = "", status = "") {
  return Helper.fetchWrapper(`/users?page=${page}&limit=${limit}&role=${role}&status=${status}`, "GET");
}

// GET /users/:id
export function getUserDetail(id: string) {
  return Helper.fetchWrapper(`/users/${id}`, "GET");
}

// POST /users
export function createUser(data: any) {
  return Helper.fetchWrapper(`/users`, "POST", data);
}

// PUT /users/:id
export function updateUser(id: string, data: any) {
  return Helper.fetchWrapper(`/users/${id}`, "PUT", data);
}

// DELETE /users/:id
export function deleteUser(id: string) {
  return Helper.fetchWrapper(`/users/${id}`, "DELETE");
}
