import { createReducer } from '@reduxjs/toolkit';
import { LocalStorage } from '../../utils/getData';
import { AUTH_TYPES, FAILURE, REQUEST, SUCCESS } from '../constants';

const user = LocalStorage.getUser();
const initialState = {
  load: false,
  isLoggedIn: user ? true : false,
  user: user ? user : {},
};

const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_TYPES.LOGIN)]: (state, action) => {
    return {
      ...state,
      load: true,
    };
  },
  [SUCCESS(AUTH_TYPES.LOGIN)]: (state, action) => {
    LocalStorage.setUser(action.payload);
    return {
      ...state,
      load: false,
      isLoggedIn: true,
      user: action.payload,
    };
  },
  [FAILURE(AUTH_TYPES.LOGIN)]: (state, action) => {
    return {
      ...state,
      load: false,
      error: action.payload,
    };
  },
  [FAILURE(AUTH_TYPES.REGISTER)]: (state, action) => {
    return {
      ...state,
      load: false,
      error: action.payload,
    };
  },
  [REQUEST(AUTH_TYPES.LOGOUT)]: (state, action) => {
    LocalStorage.removeUser();
    return {
      ...state,
      isLoggedIn: false,
      user: {},
    };
  },
});

export default authReducer;
