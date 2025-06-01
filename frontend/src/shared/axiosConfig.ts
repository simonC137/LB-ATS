import axios from 'axios';
import { toast } from 'react-toastify';

let interceptorId: number | null = null;

export function setupAxiosInterceptors() {
  if (interceptorId !== null) return; 

  interceptorId = axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        toast("Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = '/admin';
        }, 2000);
      }
      return Promise.reject(error);
    }
  );
}
