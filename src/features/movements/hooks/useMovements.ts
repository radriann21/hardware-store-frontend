import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { MovementsApi } from "@/features/movements/api/MovementApi";
import { queryKeys } from "@/shared/query/queryKeys";
import type { Pagination } from "@/shared/interfaces/interfaces";

export const useGetMovements = (params: Pagination) => {
  return useQuery({
    queryKey: [queryKeys.movements.list, params],
    queryFn: () => MovementsApi.getAllMovements(params),
    placeholderData: keepPreviousData,
  });
};
