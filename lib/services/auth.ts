import Helper from "../api";

// Login
export function login(email: string, password: string) {
  return Helper.fetchWrapper("/auth/login", "POST", { email, password });
}

// Logout
export function logout() {
  return Helper.fetchWrapper("/auth/logout", "POST");
}

// Get current user
export function getCurrentUser() {
  return Helper.fetchWrapper("/auth/me", "GET");
}

// Refresh token
export function refreshToken() {
  return Helper.fetchWrapper("/auth/refresh", "POST");
}

// Change password
export function changePassword(oldPassword: string, newPassword: string) {
  return Helper.fetchWrapper("/auth/change-password", "POST", {
    oldPassword,
    newPassword
  });
}
