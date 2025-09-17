import axios from 'axios';
import { useAuth } from '@/stores/auth.js';

export const api = axios.create({
  headers: {
    Accept: 'application/json',
  },
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

api.interceptors.request.use((config) => {
  const auth = useAuth();
  if(auth.token){
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
}, error => Promise.reject(error));
