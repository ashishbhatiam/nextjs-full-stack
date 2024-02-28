import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobs-api-g0fe.onrender.com/api/v1', // Your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if needed
  },
});

export default axiosInstance;   