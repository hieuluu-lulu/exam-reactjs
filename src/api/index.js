/** @format */

import axios from 'axios';
import queryString from 'query-string';
const API = axios.create({
	baseURL: 'http://localhost:4000',
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: (params) => queryString.stringify(params),
});
export default API;
