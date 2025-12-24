/**
 * Application Configuration
 * Centralized config untuk semua environment variables dan constants
 */

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
};

// App Configuration
export const APP_CONFIG = {
  name: 'Balkar Bucket',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
};

// Storage Keys
export const STORAGE_KEYS = {
  token: 'token',
  user: 'user',
  refreshToken: 'refreshToken',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REFRESH: '/auth/refresh',
  CHANGE_PASSWORD: '/auth/change-password',
  
  // Dashboard
  DASHBOARD_STATS: '/stats/dashboard',
  
  // API Keys
  API_KEYS: '/api-keys',
  API_KEY_DETAIL: (id: string) => `/api-keys/${id}`,
  API_KEY_REVOKE: (id: string) => `/api-keys/${id}/revoke`,
  
  // Buckets
  BUCKETS: '/buckets',
  BUCKET_DETAIL: (id: string) => `/buckets/${id}`,
  BUCKET_FILES: (id: string) => `/buckets/${id}/files`,
  
  // Files
  FILES: '/files',
  FILE_DETAIL: (id: string) => `/files/${id}`,
  FILE_UPLOAD: '/files/upload',
  FILE_DOWNLOAD: (id: string) => `/files/${id}/download`,
  FILE_DELETE: (id: string) => `/files/${id}`,
  FILES_TRASH: '/files/trash',
  
  // Users
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  
  // Roles & Permissions
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
  
  // Settings
  SETTINGS: '/settings',
  
  // Logs
  LOGS_ACTIVITY: '/logs/activity',
  LOGS_UPLOADS: '/logs/uploads',
  LOGS_ACCESS: '/logs/access',
};

export default {
  API_CONFIG,
  APP_CONFIG,
  STORAGE_KEYS,
  API_ENDPOINTS,
};
