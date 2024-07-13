import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
});
const navigate = useNavigate();

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Add token to headers except for specific endpoints
      if (
        !config.url.includes('/auth/signup') && 
        !config.url.includes('/auth/login') &&
        !config.url.includes('/learn-more') &&
        !config.url.includes('/')){
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error response
    if (error.response && error.response.status === 401) {
      navigate('/main');
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default apiClient;