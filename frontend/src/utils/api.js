// utils/api.js
import axios from 'axios';

// Create an Axios instance with the base URL from .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Backend base URL from .env
  withCredentials: true, // Enable cookies if needed
});

// Request Interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach Bearer token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Remove token if unauthorized
      localStorage.removeItem('user');
      window.location.href = '/signin'; // Redirect to signin page
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
