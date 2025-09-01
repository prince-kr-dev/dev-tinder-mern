import axios from "axios";
import { URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true, // send cookies too
});

// attach token if exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
