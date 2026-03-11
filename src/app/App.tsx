import { useEffect } from "react";
import { Toaster } from "@/shared/components/ui/toaster";
import { AppRoutes } from "./AppRoutes";
import { useAuthStore } from "@/shared/stores/AuthStore";
import { axiosClient } from "@/shared/api/axiosClient";

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await axiosClient.get("/auth/me");
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    initAuth();
  }, [setUser]);

  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}
export default App;
