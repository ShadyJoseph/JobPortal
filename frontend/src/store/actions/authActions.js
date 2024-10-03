import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async action to handle login
export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/signin', userData);
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  }
);

// Async action to handle logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await api.get('/logout');
  // Clear token and user data
  localStorage.removeItem('token');
  return null;
});

// Async action to handle signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/signup', userData);
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'An error occurred');
    }
  }
);
