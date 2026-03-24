import { useRoutes } from "react-router";
import { lazy, Suspense } from "react";
import { Auth } from "@/features/auth/Auth";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { ProtectedRoute } from "@/shared/components/guards/ProtectedRoute";
import { SuspenseLoading } from "@/shared/components/custom/SuspenseLoading";

// Lazy load components
const Categories = lazy(() => import("@/features/categories/Categories"));
const Providers = lazy(() => import("@/features/suppliers/Providers"));
const Measures = lazy(() => import("@/features/measures/Measures"));
const Users = lazy(() => import("@/features/users/Users"));
const Products = lazy(() => import("@/features/products/Products"));
const Movements = lazy(() => import("@/features/movements/Movements"));

export const AppRoutes = () => {

  const routes = useRoutes([
    { path: "/", element: <Auth /> },
    { element: <ProtectedRoute />, children: [
      { element: <MainLayout />, children: [
        {
          path: "/dashboard",
          element: <div>Dashboard</div>
        },
        {
          path: "/categorias",
          element: <Categories />
        },
        {
          path: "/proveedores",
          element: <Providers />
        },
        {
          path: "/medidas",
          element: <Measures />
        },
        {
          path: "/usuarios",
          element: <Users />
        },
        {
          path: "/productos",
          element: <Products />
        },
        {
          path: "/movimientos",
          element: <Movements />
        }
      ] }
    ] }
  ])

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {routes}
    </Suspense>
  )
};
