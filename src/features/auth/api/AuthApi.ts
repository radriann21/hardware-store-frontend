import { axiosClient } from "@/shared/api/axiosClient";
import type { LoginDto } from "@/features/auth/dtos/login.dto";

export const AuthApi = {
  async login(data: LoginDto) {
    const response = await axiosClient.post("/auth/login", data);
    return response.data;
  },
  async logout() {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
  },
};
