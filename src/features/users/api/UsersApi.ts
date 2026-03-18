import { axiosClient } from "@/shared/api/axiosClient";
import type { UserForm } from "../validations/user.validation";
import type { Pagination } from "@/shared/interfaces/interfaces";
import type { UsersResponse } from "../interfaces/interfaces";

export const UsersApi = {
  createUser: async (data: UserForm) => {
    const response = await axiosClient.post("/users", data);
    return response.data;
  },
  getAllUsers: async ({ page = 1, limit = 10, search }: Pagination): Promise<UsersResponse> => {
    const response = await axiosClient.get("/users", {
      params: { page, limit, search },
    });
    return response.data;
  },
  updateUser: async (id: string, data: Partial<UserForm>) => {
    const response = await axiosClient.patch(`/users/update/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await axiosClient.delete(`/users/delete/${id}`);
    return response.data;
  },
};
