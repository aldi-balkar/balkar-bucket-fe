import Helper from "../api";
import { API_ENDPOINTS } from "../config";

// Login
export function login(email: string, password: string) {
  return Helper.fetchWrapper(API_ENDPOINTS.LOGIN, "POST", { email, password });
}

// Logout
export function logout() {
  return Helper.fetchWrapper(API_ENDPOINTS.LOGOUT, "POST");
}

// Get current user
export function getCurrentUser() {
  return Helper.fetchWrapper(API_ENDPOINTS.ME, "GET");
}

// Refresh token
export function refreshToken() {
  return Helper.fetchWrapper(API_ENDPOINTS.REFRESH, "POST");
}

// Change password
export function changePassword(oldPassword: string, newPassword: string) {
  return Helper.fetchWrapper(API_ENDPOINTS.CHANGE_PASSWORD, "POST", {
    oldPassword,
    newPassword
  });
}
