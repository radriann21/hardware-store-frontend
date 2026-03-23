import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { UsersApi } from "@/features/users/api/UsersApi";
import { queryKeys } from "@/shared/query/queryKeys";
import { toaster } from "@/shared/components/ui/toaster";
import type { UserForm } from "@/features/users/validations/user.validation";
import type { Pagination } from "@/shared/interfaces/interfaces";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserForm) => UsersApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users.list] });
      toaster.create({
        title: "Usuario creado",
        description: "El usuario se ha creado correctamente",
        type: "success"
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Error al crear el usuario",
        description: error.message,
        type: "error"
      });
    }
  });
};

export const useGetUsers = (params: Pagination = { page: 1, limit: 10 }) => {
  return useQuery({
    queryKey: [queryKeys.users.list, params],
    queryFn: () => UsersApi.getAllUsers(params),
    placeholderData: keepPreviousData
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => UsersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users.list] })
      toaster.create({
        title: "Usuario eliminado exitosamente",
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

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UserForm> }) => UsersApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.users.list] })
      toaster.create({
        title: "Usuario actualizado exitosamente",
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
