import { axiosClient } from "@/shared/api/axiosClient";
import type { ProviderForm } from "@/features/suppliers/validations/providers.validation";
import type { Provider } from "@/features/suppliers/interfaces/interfaces";

export const providerApi = {
  createProvider: async (data: ProviderForm) => {
    const response = await axiosClient.post("/providers", data);
    return response.data;
  },
  getAllProviders: async (): Promise<Provider[]> => {
    const response = await axiosClient.get("/providers");
    return response.data;
  },
  deleteProvider: async (id: string) => {
    const response = await axiosClient.delete(`/providers/delete/${id}`)
    return response.data
  },
  editProvider: async (id: string, data: Partial<ProviderForm>) => {
    const response = await axiosClient.patch(`/providers/update/${id}`, data)
    return response.data
  }
}