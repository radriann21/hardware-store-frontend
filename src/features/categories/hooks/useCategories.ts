import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryApi } from "@/features/categories/api/CategoryApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { CategoryForm } from "@/features/categories/validations/category.validation";

export const useCreateCategory = ({ reset }: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CategoryForm) => categoryApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories.list] });
      toaster.create({
        title: "Categoría creada",
        description: "La categoría se ha creado correctamente",
        type: "success"
      });
      reset();
    },
    onError: (error) => {
      toaster.create({
        title: "Error al crear la categoría",
        description: error.message,
        type: "error"
      });
    }
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: [queryKeys.categories.list],
    queryFn: () => categoryApi.getAllCategories(),
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id:number) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories.list] })
      toaster.create({
        title: "Categoría eliminada exitosamente",
        type: "success"
      })
    },
    onError: () => {
      toaster.create({
        title: "Hubo un error al eliminar",
        type: "error"
      })
    }
  })
}

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CategoryForm> }) => categoryApi.editCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.categories.list] })
      toaster.create({
        title: "Categoría actualizada exitosamente",
        type: "success"
      })
    },
    onError: (error) => {
      toaster.create({
        title: "Hubo un error al actualizar",
        description: error.message,
        type: "error"
      })
    }
  })
}
