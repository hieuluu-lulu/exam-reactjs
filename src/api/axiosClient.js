/** @format */

import axios from 'axios';
import qs from 'qs';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    req.headers.authorization = 'Bearer ' + JSON.parse(user).accessToken;
  }

  return req;
});
API.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
});
export default API;
