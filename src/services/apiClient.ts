import { env } from '@/config/env.config';
import axios from 'axios';
import { keycloak, updateTokensInStorage } from './keycloak';

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const refreshed = await keycloak.updateToken(5);

    if (refreshed) {
      console.info('✅ Token refreshed before request');
      updateTokensInStorage();
    }

    const token = keycloak.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('❌ Failed to refresh token in request interceptor:', error);
    keycloak.login();
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (env.DEV) {
      console.info(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshed = await keycloak.updateToken(-1);

        if (refreshed && keycloak.token) {
          console.info('Token refreshed via keycloak');
          updateTokensInStorage();

          originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
          return apiClient(originalRequest);
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        keycloak.login();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
