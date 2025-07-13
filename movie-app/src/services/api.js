import axios from 'axios';

// The base URL of your running backend server.
const API_URL = 'http://localhost:5001/api'; 

// Create an axios instance with the base URL.
const api = axios.create({
  baseURL: API_URL,
});

// Function to set the JWT in the default headers for all subsequent requests.
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

// Export all your API functions.
export default api;