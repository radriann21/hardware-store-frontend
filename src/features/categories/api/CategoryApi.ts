import { axiosClient } from "@/shared/api/axiosClient";
import type { CategoryForm } from "@/features/categories/validations/category.validation";
import type { Category } from "@/features/categories/interfaces/interfaces";

export const categoryApi = {
  createCategory: async (data: CategoryForm) => {
    const response = await axiosClient.post("/categories", data);
    return response.data;
  },
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axiosClient.get("/categories");
    return response.data;
  },
  deleteCategory: async (id: number) => {
    const response = await axiosClient.delete(`/categories/delete/${id}`)
    return response.data
  },
  editCategory: async (id: number, data: Partial<CategoryForm>) => {
    const response = await axiosClient.patch(`/categories/update/${id}`, data)
    return response.data
  }
}