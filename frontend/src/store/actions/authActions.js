import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// Async action to handle login
export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    console.log('Signin attempt:', userData);
    try {
      const response = await api.post('/auth/signin', userData);
      const { token, user } = response.data;

      console.log('Signin successful:', response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Signin error:', error.response?.data || 'An error occurred');
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

// Async action to handle logout
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    console.log('Logout attempt');
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logout successful');
      return null;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
);

// Async action to handle signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    console.log('Signup attempt:', userData);
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      console.log('Signup successful:', response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || 'An error occurred');
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
