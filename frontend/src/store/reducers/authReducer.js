import { createSlice } from '@reduxjs/toolkit';
import { signin, logout, signup } from '../actions/authActions';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Get user from localStorage
  token: localStorage.getItem('token') || null, // Get token from localStorage
  isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
  loading: false,
  error: null,
  logoutSuccess: false, // Add a flag for successful logout
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add a new reducer to reset logout success
    resetLogoutSuccess: (state) => {
      state.logoutSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Assign user from payload
        state.token = action.payload.token; // Assign token from payload
        localStorage.setItem('token', action.payload.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user data
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Assign user from payload
        state.token = action.payload.token; // Assign token from payload
        localStorage.setItem('token', action.payload.token); // Store JWT token
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user data
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.logoutSuccess = true; // Set logout success to true
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('user'); // Remove user data from localStorage
      });
  },
});

export const { resetLogoutSuccess } = authSlice.actions;
export default authSlice.reducer;
