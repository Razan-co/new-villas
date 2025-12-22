// src/api/apiClient.js
import axios from 'axios';
import  ApiEndpoints  from './ApiEndpoints';

const apiClient = axios.create({
  baseURL: ApiEndpoints.BASE_URL,
  withCredentials: true, // send/receive cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: response error logging
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error?.response || error);
    return Promise.reject(error);
  }
);


export default apiClient