import { axiosClient } from "@/shared/api/axiosClient";
import type { Pagination } from "@/shared/interfaces/interfaces";

export const MovementsApi = {
  getAllMovements: async ({ page = 1, limit = 10, search }: Pagination) => {
    const response = await axiosClient.get("/stock", {
      params: {
        page,
        limit,
        search,
      },
    });
    return response.data;
  },
};
