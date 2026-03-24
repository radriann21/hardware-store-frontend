import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { MovementsApi } from "@/features/movements/api/MovementApi";
import { queryKeys } from "@/shared/query/queryKeys";
import type { Pagination } from "@/shared/interfaces/interfaces";
import type { MovementFormData } from "../validations/movement.validation";
import { toaster } from "@/shared/components/ui/toaster";

export const useGetMovements = (params: Pagination) => {
  return useQuery({
    queryKey: [queryKeys.movements.list, params],
    queryFn: () => MovementsApi.getAllMovements(params),
    placeholderData: keepPreviousData,
  });
};

export const useCreateMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MovementFormData) => MovementsApi.createMovement(data),
    onSuccess: () => {
      toaster.create({
        title: "Movimiento creado exitosamente",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.movements.list],
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Ha ocurrido un error",
        description: error.message,
        type: "error",
      });
    },
  });
};
