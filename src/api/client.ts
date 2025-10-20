import axios from 'axios';
import { storageUtils, StorageKeys } from '../utils/storage';

export const API_BASE_URL = 'https://dummyjson.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = storageUtils.getItem(StorageKeys.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token
      storageUtils.removeItem(StorageKeys.AUTH_TOKEN);
      storageUtils.removeItem(StorageKeys.USER_DATA);
    }
    return Promise.reject(error);
  }
);