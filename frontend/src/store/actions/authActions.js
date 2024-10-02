// src/store/actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async action to handle login
export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/signin', userData);
            return response.data; // token and user data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action to handle logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await api.get('/auth/logout'); // Assuming logout is a GET request
    return null; // Clear user data on logout
});

// Async action to handle signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
      try {
          const response = await api.post('/auth/signup', userData);
          return response.data; // token and user data
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);
