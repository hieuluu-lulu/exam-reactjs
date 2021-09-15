import { createAction } from '@reduxjs/toolkit';
import { AUTH_TYPES, REQUEST } from '../constants';

export const loginAction = createAction(REQUEST(AUTH_TYPES.LOGIN));
export const registerAction = createAction(REQUEST(AUTH_TYPES.REGISTER));
export const logoutAction = createAction(REQUEST(AUTH_TYPES.LOGOUT));
export const getUserInfoAction = createAction(REQUEST(AUTH_TYPES.GET_USER_INFO));
