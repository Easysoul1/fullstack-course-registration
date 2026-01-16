import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const registrationAPI = {
  submitRegistration: async (formData) => {
    try {
      const response = await apiClient.post('/api/register', formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        // Request made but no response
        throw new Error('Unable to connect to server. Please check your internet connection.');
      } else {
        // Something else happened
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  },
};

export default apiClient;
