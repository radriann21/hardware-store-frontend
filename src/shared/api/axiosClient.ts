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

    if (!error.response) {
      toaster.create({
        title: "Error de conexión",
        description: "No se pudo conectar con el servidor",
        type: "error",
      });
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const isLogoutResponse = error.config.url?.includes("/auth/logout");

    switch (status) {
      case 400:
        toaster.create({
          title: "Error de validación",
          description: data.message || "Error de validación",
          type: "error",
        });
        break;
      case 401:
        useAuthStore.getState().setUser(null);
        if (!error.config.url?.includes("/auth/me") && !isLogoutResponse) {
          toaster.create({ title: "Sesión expirada", type: "error" });
        }
        break;
      case 403:
        toaster.create({ title: "Acceso denegado", type: "error" });
        break;
      case 404:
        toaster.create({ title: "Recurso no encontrado", type: "error" });
        break;

      case 500:
      case 502:
      case 503:
        toaster.create({
          title: "Error del servidor",
          description: "Por favor, intenta nuevamente más tarde",
          type: "error",
        });
        break;

      default:
        toaster.create({
          title: "Error desconocido",
          description: "Ocurrió un error inesperado",
          type: "error",
        });
        break;
    }

    return Promise.reject(error);
  },
);
