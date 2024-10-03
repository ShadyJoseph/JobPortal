import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jobportal-i3uh.onrender.com/api',
  withCredentials: true, // Enable cookies
});

// Interceptor to attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token expiration and auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized (token expired or invalid), trigger logout
      localStorage.removeItem('token');
      // Optionally notify the user
      window.location.href = '/signin'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;