import { USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL } from '../../constants/userConstants';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const userEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case USER_EDIT_SUCCESS:
      return { loading: false, success: true, error: null };
    case USER_EDIT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
