import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async action to handle login
export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signin', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token); // Store JWT token
      localStorage.setItem('user', JSON.stringify(user)); // Store user data

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async action to handle logout
export const logout = createAsyncThunk('/auth/logout', async () => {
  try {
    await api.get('/auth/logout'); // Backend clears the cookie
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user'); // Remove user data from localStorage
    return null;
  } catch (error) {
    console.error('Logout failed:', error);
  }
});

// Async action to handle signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      console.log('Signup Response:', response.data); // Log the response data
      localStorage.setItem('token', token); // Store JWT token
      localStorage.setItem('user', JSON.stringify(user)); // Store user data

      return response.data; // Return the response data on success
    } catch (error) {
      console.error('Signup Error:', error.response?.data || 'An error occurred'); // Log the error for debugging
      return rejectWithValue(error.response?.data || 'An error occurred'); // Handle errors
    }
  }
);
