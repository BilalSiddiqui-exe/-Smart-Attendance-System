import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000" ;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: sends cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password, role = 'student') => {
  const response = await api.post('/auth/register', { name, email, password, role });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  // This would need a backend endpoint - for now we'll use localStorage
  const user = localStorage.getItem('user');
  if (!user) throw new Error('Not authenticated');
  return JSON.parse(user);
};

export default api;
