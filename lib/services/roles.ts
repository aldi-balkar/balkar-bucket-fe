import Helper from "../api";

// GET /roles
export function getRoles() {
  return Helper.fetchWrapper(`/roles`, "GET");
}

// GET /roles/:id
export function getRoleDetail(id: string) {
  return Helper.fetchWrapper(`/roles/${id}`, "GET");
}

// POST /roles
export function createRole(data: any) {
  return Helper.fetchWrapper(`/roles`, "POST", data);
}

// PUT /roles/:id
export function updateRole(id: string, data: any) {
  return Helper.fetchWrapper(`/roles/${id}`, "PUT", data);
}

// DELETE /roles/:id
export function deleteRole(id: string) {
  return Helper.fetchWrapper(`/roles/${id}`, "DELETE");
}
