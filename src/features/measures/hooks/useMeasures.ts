import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { measureApi } from "@/features/measures/api/MeasuresApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { MeasureFormValues } from "@/features/measures/validation/measure.validation";

export const useCreateMeasure = ({ reset }: { reset: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MeasureFormValues) => measureApi.createMeasure(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.measures.list] });
      toaster.create({
        title: "Medida creada",
        description: "La medida se ha creado correctamente",
        type: "success"
      });
      reset();
    },
    onError: (error) => {
      toaster.create({
        title: "Error al crear la medida",
        description: error.message,
        type: "error"
      });
    }
  });
};

export const useGetMeasures = () => {
  return useQuery({
    queryKey: [queryKeys.measures.list],
    queryFn: () => measureApi.getAllMeasures(),
  });
};

export const useDeleteMeasure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => measureApi.deleteMeasure(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.measures.list] })
      toaster.create({
        title: "Medida eliminada exitosamente",
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

export const useEditMeasure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MeasureFormValues> }) => measureApi.editMeasure(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.measures.list] })
      toaster.create({
        title: "Medida actualizada exitosamente",
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
