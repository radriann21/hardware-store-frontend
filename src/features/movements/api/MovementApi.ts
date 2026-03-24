import { axiosClient } from "@/shared/api/axiosClient";
import type { Pagination } from "@/shared/interfaces/interfaces";
import type { MovementFormData } from "@/features/movements/validations/movement.validation";

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
  createMovement: async (data: MovementFormData) => {
    const response = await axiosClient.post("/stock", data);
    return response.data;
  },
};
