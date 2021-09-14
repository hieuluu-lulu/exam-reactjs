/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { LocalStorage } from '../../utils/getData';

const user = LocalStorage.getUser();
const initialState = {
	load: false,
	isLoggedIn: user ? true : false,
	user: user ? user : {},
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.load = true;
		},
		loginSuccess(state, action) {
			LocalStorage.setUser(action.payload);
			state.load = false;
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		loginFailed(state, action) {
			state.load = false;
		},
		logout(state, action) {
			state.load = false;
			state.isLoggedIn = false;
			state.user = {};
			LocalStorage.removeUser();
		},
		signUp(state, action) {
			state.load = true;
		},
		signUpSuccess(state, action) {
			state.load = false;
		},
	},
});
// actions

export const authActions = authSlice.actions;

//reducer
const authReducer = authSlice.reducer;

// secletor

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectLoad = (state) => state.auth.load;

export default authReducer;
