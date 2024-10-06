import api from '../../utils/api';
import { USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL } from '../../constants/userConstants';

export const editUser = (userData) => async (dispatch, getState) => {
  try {
    console.log('Edit User Action Initiated');
    dispatch({ type: USER_EDIT_REQUEST });

    // Retrieve the token and user from the state or localStorage
    const state = getState();
    const userInfo = state.auth?.user || JSON.parse(localStorage.getItem('user'));
    const token = state.auth?.token || localStorage.getItem('token');

    if (!userInfo || !token) {
      throw new Error('User is not logged in.');
    }

    console.log('User Info Retrieved:', userInfo);

    // Set the authorization token for the API request
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Authorization Header Set:', api.defaults.headers.common['Authorization']);

    // Send PUT request to update the user's data
    const { data } = await api.put(`/user/edit/${userInfo.id}`, userData);
    console.log('API Response Data:', data);

    // Update local storage with the new user data
    localStorage.setItem('user', JSON.stringify(data));

    // Dispatch success action with the updated user data
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
    console.log('User Edit Success:', data);
  } catch (error) {
    console.error('User Edit Failed:', error.response?.data || error.message); // Log error details
    dispatch({
      type: USER_EDIT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
