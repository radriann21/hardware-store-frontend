import { axiosClient } from "@/shared/api/axiosClient";
import type { ProductResponse } from "../interfaces/interfaces";
import type { Pagination } from "@/shared/interfaces/interfaces";
import type { ProductFormData } from "../validations/product.validation";

export const ProductsApi = {
  async getAllProducts({
    page = 1,
    limit = 10,
    search = "",
  }: Pagination): Promise<ProductResponse> {
    const response = await axiosClient.get("/products", {
      params: { page, limit, search },
    });
    return response.data;
  },
  async createNewProduct(data: ProductFormData) {
    const response = await axiosClient.post("/products", data);
    return response.data;
  },
  async deleteProduct(id: string) {
    const response = await axiosClient.delete(`/products/${id}`);
    return response.data;
  },
  async editProduct(id: string, data: Partial<ProductFormData>) {
    const response = await axiosClient.patch(`/products/${id}`, data);
    return response.data;
  },
  async getExportProducts() {
    const response = await axiosClient.get("/products/export", {
      responseType: "blob"
    });
    return response.data;
  },
  async importProductsFromExcel(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosClient.post("products/import", formData)
    return response.data;
  }
};
