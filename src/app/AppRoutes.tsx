import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";
import { Auth } from "@/features/auth/Auth";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";

// Lazy load components
const Categories = lazy(() => import("@/features/categories/Categories"));
const Providers = lazy(() => import("@/features/suppliers/Providers"));
const Measures = lazy(() => import("@/features/measures/Measures"));
const Users = lazy(() => import("@/features/users/Users"));

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<div>Dashboard</div>} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/proveedores" element={<Providers />} />
            <Route path="/medidas" element={<Measures />} />
            <Route path="/usuarios" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
