/** @format */

import axios from 'axios';
import queryString from 'query-string';

const API = axios.create({
	baseURL: 'http://localhost:4000',
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: (params) => queryString.stringify(params),
});

API.interceptors.request.use(async (config) => {
	return config;
});
API.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	},
);
export default API;
