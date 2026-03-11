import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/shared/stores/AuthStore";

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) return null; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
