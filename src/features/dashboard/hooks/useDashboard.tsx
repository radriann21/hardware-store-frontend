import { useQuery } from "@tanstack/react-query";
import { DashboardApi } from "@/features/dashboard/api/DashboardApi";
import type { DashboardData } from "@/features/dashboard/interfaces/dashboard.interface";
import { queryKeys } from "@/shared/query/queryKeys";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: [queryKeys.dashboard.stats],
    queryFn: () => DashboardApi.getStats(),
    select: (data: DashboardData) => data,
  });
};