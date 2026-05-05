import axios from "axios";
import { useAuthStore } from "../store/auth";

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return data;
});
