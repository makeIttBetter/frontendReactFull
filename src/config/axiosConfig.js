import axios from 'axios';
import { createBrowserHistory } from 'history';

// Create an Axios instance
// 'https://aitravelplannerbackend-production.up.railway.app:8080'
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localost:8080',
});

// History object for navigation outside of React components
export const history = createBrowserHistory();

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Add token to headers except for specific endpoints
      if (
        !config.url.includes('/auth/signup') && 
        !config.url.includes('/auth/login') &&
        !config.url.includes('/learn-more')
      ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // console.log('Request config:', config);  // Log the request configuration
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
      history.push('/main');
      console.error('Unauthorized, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
