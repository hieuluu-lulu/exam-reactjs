/** @format */

import API from './axiosClient';
export const signIn = (form) => API.post('/login', form);
export const getUserInfo = (id) => API.get(`/600/users/${id}`);
export const singUp = (form) => API.post('/register', form);
