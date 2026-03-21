import { ProductsApi } from "../api/ProductsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/shared/query/queryKeys";
import type { Pagination } from "@/shared/interfaces/interfaces";
import type { ProductFormData } from "../validations/product.validation";
import { toaster } from "@/shared/components/ui/toaster";

export const useGetAllProducts = ({ page, limit, search }: Pagination) => {
  return useQuery({
    queryFn: () => ProductsApi.getAllProducts({ page, limit, search }),
    queryKey: [queryKeys.products.list, { page, limit, search }],
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductFormData) => ProductsApi.createNewProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.list],
      });
      toaster.create({
        title: "Producto creado",
        description: "El producto se ha creado correctamente",
        type: "success"
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error al crear el producto",
        type: "error",
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProductsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.list],
      });
      toaster.create({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente",
        type: "success"
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error al eliminar el producto",
        type: "error",
      });
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductFormData> }) => ProductsApi.editProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products.list],
      });
      toaster.create({
        title: "Producto actualizado",
        description: "El producto se ha actualizado correctamente",
        type: "success"
      });
    },
    onError: () => {
      toaster.create({
        title: "Error",
        description: "Error al actualizar el producto",
        type: "error",
      });
    },
  });
}