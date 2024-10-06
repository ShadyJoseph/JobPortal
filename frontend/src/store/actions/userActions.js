import api from '../../utils/api';
import { USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL } from '../../constants/userConstants';

export const editUser = (userId, userData) => async (dispatch, getState) => {
    try {
        console.log('Edit User Action Initiated');
        console.log('User Data to Update:', userData); // Log user data being sent
        dispatch({ type: USER_EDIT_REQUEST });

        const state = getState();
        const userInfo = state.auth?.user || JSON.parse(localStorage.getItem('user'));
        const token = state.auth?.token || localStorage.getItem('token');

        if (!userInfo || !token) {
            throw new Error('User is not logged in.');
        }

        // Set the authorization token for the API request
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Send PUT request to update the user's data
        const { data } = await api.put(`/user/edit/${userId}`, userData);

        // Combine the updated user data with any existing user data
        const updatedUser = { ...userInfo, ...data }; // Ensure existing data is preserved

        // Update local storage with the new user data
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Save the updated user

        // Dispatch success action with the updated user data
        dispatch({ type: USER_EDIT_SUCCESS, payload: updatedUser });
    } catch (error) {
        console.error('User Edit Failed:', error.response?.data || error.message); // Log error details
        dispatch({
            type: USER_EDIT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
