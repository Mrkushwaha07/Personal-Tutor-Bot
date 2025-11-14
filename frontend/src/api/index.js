import axios from 'axios';

// Use environment variable with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                     process.env.REACT_APP_API_URL || 
                     'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || process.env.REACT_APP_API_TIMEOUT || '30000'),
});

// Add token to requests if available
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('studentId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;