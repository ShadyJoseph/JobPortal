import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async action to handle login
export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signin', userData);
      localStorage.setItem('token', response.data.token); // Store JWT token
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
    return null;
  } catch (error) {
    console.error('Logout failed:', error);
  }
});

// Async action to handle signup
export const signup = createAsyncThunk(
  '/auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userData);
      localStorage.setItem('token', response.data.token); // Store JWT token
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
