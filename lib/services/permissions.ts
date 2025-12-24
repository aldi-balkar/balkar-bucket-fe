import Helper from "../api";

// GET /permissions
export function getPermissions(category = "") {
  return Helper.fetchWrapper(`/permissions?category=${category}`, "GET");
}
