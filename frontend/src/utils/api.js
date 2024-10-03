import axios from 'axios';

// Create axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://jobportal-i3uh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor to handle token expiration and auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized (token expired or invalid), trigger logout
      localStorage.removeItem('token');
      window.location.href = '/signin'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
