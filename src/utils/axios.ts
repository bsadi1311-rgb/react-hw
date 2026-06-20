import axios from "axios";

export const saveTokens = (access, refresh) => {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const axiosRequest = axios.create({
  baseURL: "https://debt-back-prod.onrender.com/api",
});

axiosRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});