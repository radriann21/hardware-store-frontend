import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../api/AuthApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/shared/stores/AuthStore";
import type { LoginDto } from "@/features/auth/dtos/login.dto";
import type { User } from "@/shared/interfaces/interfaces";

export const useLoginQuery = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationKey: [queryKeys.auth.login],
    mutationFn: (data: LoginDto): Promise<{ user: User }> => AuthApi.login(data),
    onSuccess: (data) => {
      toaster.create({
        title: "Iniciando sesión",
        description: "Has sido redirigido",
        type: "success",
      });
      setUser(data.user);
      navigate("/dashboard");
    },
    onError: () => {
      toaster.create({
        title: "Error al iniciar sesión",
        description: "Por favor, verifica tus credenciales e intenta de nuevo",
        type: "error",
      });
    },
  });
};