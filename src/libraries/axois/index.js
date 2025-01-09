import axios from "axios";
import { getCookie } from "../cookies/index";

console.log("API URL:", process.env.REACT_APP_API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request Interceptor: Check for a stored token and inject it into the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-type"] = "application/json; charset=UTF-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 errors by refreshing the token and retrying the request
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   const { data } = await axios.post('<https://api.example.com/refresh>', { token: refreshToken });
    //   localStorage.setItem('token', data.token);
    //   axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    //   return axiosInstance(originalRequest);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
