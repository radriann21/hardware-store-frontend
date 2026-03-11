import axios from "axios";
import { toaster } from "@/shared/components/ui/toaster";
import { useAuthStore } from "@/shared/stores/AuthStore";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    const isLogoutResponse = error.config.url?.includes('/auth/logout');

    if (error.response?.status === 401) {
      useAuthStore.getState().setUser(null);
      if (!error.config.url?.includes("/auth/me") && !isLogoutResponse) {
        toaster.create({ title: "Sesión expirada", type: "error" });
      }
    } else if (error.response?.status >= 500) {
      toaster.create({
        title: "Error del servidor",
        description: "Por favor, intenta nuevamente más tarde",
        type: "error",
      });
    }

    return Promise.reject(error);
  },
);
