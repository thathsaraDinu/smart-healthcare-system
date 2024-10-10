import { SERVER_URL } from '@/constants';
import { useAuthStore } from '@/store/auth-store';
import { refreshToken } from '@/api/auth.api';
import axios, { AxiosError } from 'axios';

// Create an instance of axios
const baseConfig = {
  baseURL: SERVER_URL,
  withCredentials: true, // to include cookies for cross-origin requests if needed
};

export const instanceWithoutInterceptors =
  axios.create(baseConfig);

export const instance = axios.create(baseConfig);

// Track the refresh token promise to prevent multiple refreshes simultaneously
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.request.use(
  function (config) {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Check if the error status is 403 and if the request is not already retried
    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If another refresh token request is already in progress, queue this request
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();

        const { accessToken } = response;

        useAuthStore.setState({ accessToken });

        // Update authorization headers and process queued requests
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Log out the user if refreshing token fails
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 403
        ) {
          useAuthStore.getState().logOut();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
