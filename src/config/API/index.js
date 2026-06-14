import axios from "axios";
import Auth from "../modules/Auth";
import { ApiError } from "./ApiError";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

/*
 * Request Interceptor
 * Automatically adds JWT token if available.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = Auth.getToken();

    // Don't overwrite Authorization if it is passed explicitly
    if (token && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/*
 * Response Interceptor
 * Converts Axios errors into ApiError.
 */
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    // Network Error
    if (!error.response) {
      return Promise.reject(
        new ApiError("Unable to connect to the server.", 500),
      );
    }

    const { status, data } = error.response;

    // Unauthorized
    if (status === 401) {
      Auth.logout();
    }

    return Promise.reject(
      new ApiError(data?.message || "Request failed", status, data),
    );
  },
);

const API = {
  async get(url, config = {}) {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  async post(url, data = {}, config = {}) {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  async put(url, data = {}, config = {}) {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  async patch(url, data = {}, config = {}) {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },

  async delete(url, config = {}) {
    const response = await apiClient.delete(url, config);
    return response.data;
  },
};

export default API;
