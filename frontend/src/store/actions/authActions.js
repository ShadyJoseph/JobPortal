import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const signin = createAsyncThunk(
  'auth/signin',
  async (userData, { rejectWithValue }) => {
    console.log('Signin Action Initiated with data:', userData); 
    try {
      const response = await api.post('/auth/signin', userData);
      const { token, user } = response.data;

      console.log('Signin Successful:', response.data); 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Signin Failed:', error); 
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    console.log('Signup Action Initiated with data:', userData); 
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      console.log('Signup Successful:', response.data); 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Signup Failed:', error); 
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    console.log('Logout Action Initiated'); 
    try {
      await api.get('/auth/logout'); 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logout Successful'); 
      return null;
    } catch (error) {
      console.error('Logout Failed:', error); 
      throw new Error('Logout failed');
    }
  }
);
