import { API_CONFIG } from './config';

/**
 * Main fetch wrapper with timeout and error handling
 * ALWAYS hits backend at http://localhost:8000/api
 */
export async function fetchWrapper(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    // IMPORTANT: Always use full backend URL
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    
    console.log(`[API] ${method} ${url}`); // Debug log
    
    const options: RequestInit = {
      method,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
    };

    // Add auth token if exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    console.error(`[API Error] ${method} ${endpoint}:`, error.message);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

/**
 * Upload file with FormData
 */
export async function uploadFile(endpoint: string, formData: FormData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const url = `${API_CONFIG.baseURL}${endpoint}`;
    
    console.log(`[API] POST ${url} (file upload)`);
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Upload failed');
    }

    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    console.error(`[API Error] Upload ${endpoint}:`, error.message);
    
    if (error.name === 'AbortError') {
      throw new Error('Upload timeout');
    }
    throw error;
  }
}

// Export default helper
const Helper = {
  fetchWrapper,
  uploadFile,
};

export default Helper;
