import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { providerApi } from "@/features/suppliers/api/ProvidersApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { ProviderForm } from "@/features/suppliers/validations/providers.validation";

export const useCreateProvider = ({ reset }: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProviderForm) => providerApi.createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.providers.list] });
      toaster.create({
        title: "Proveedor creado",
        description: "El proveedor se ha creado correctamente",
        type: "success"
      });
      reset();
    },
    onError: (error) => {
      toaster.create({
        title: "Error al crear el proveedor",
        description: error.message,
        type: "error"
      });
    }
  });
};

export const useGetProviders = () => {
  return useQuery({
    queryKey: [queryKeys.providers.list],
    queryFn: () => providerApi.getAllProviders(),
  });
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id:string) => providerApi.deleteProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.providers.list] })
      toaster.create({
        title: "Proveedor eliminado exitosamente",
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

export const useEditProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProviderForm> }) => providerApi.editProvider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.providers.list] })
      toaster.create({
        title: "Proveedor actualizado exitosamente",
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
