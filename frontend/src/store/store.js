// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { userEditReducer } from './reducers/userReducers'; // Import the userEditReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    userEdit: userEditReducer, // Add the userEditReducer to the store
  },
});

export default store;
