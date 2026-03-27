import { axiosClient } from "@/shared/api/axiosClient";

export const DashboardApi = {
  async getStats() {
    const response = await axiosClient.get("/dashboard");
    return response.data;
  },
};