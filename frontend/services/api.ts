// Base API Service
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  post: async (endpoint: string, data: any, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  put: async (endpoint: string, data: any, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  delete: async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },
};
