import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editUserSchema,
  type EditUserForm,
} from "@/features/users/validations/user.validation";
import { useEditUser } from "@/features/users/hooks/useUsers";
import { useEffect } from "react";
import type { User } from "@/features/users/interfaces/interfaces";

interface EditUserDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const EditUserDialog = ({ user, isOpen, onClose }: EditUserDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      password: "",
    },
  });

  const { mutate: editUser } = useEditUser();

  useEffect(() => {
    reset({
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      password: "",
    });
  }, [user, reset]);

  const onSubmit = (data: EditUserForm) => {
    const updateData = data.password ? data : { ...data, password: undefined };
    editUser({ id: user.id, data: updateData });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Editar Usuario</Dialog.Title>
              <Dialog.Description>
                Modifique los campos para actualizar el usuario
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset.Root>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>
                      Nombre
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("name")}
                      placeholder="Nombre del usuario"
                      size="sm"
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.lastname}>
                    <Field.Label>
                      Apellido
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("lastname")}
                      placeholder="Apellido del usuario"
                      size="sm"
                    />
                    {errors.lastname && (
                      <Field.ErrorText>{errors.lastname.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.username}>
                    <Field.Label>
                      Nombre de usuario
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("username")}
                      placeholder="Nombre de usuario"
                      size="sm"
                    />
                    {errors.username && (
                      <Field.ErrorText>{errors.username.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.password}>
                    <Field.Label>
                      Contraseña (opcional)
                    </Field.Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Dejar vacío para no cambiar"
                      size="sm"
                    />
                    {errors.password && (
                      <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Button type="submit" colorPalette="green">Actualizar</Button>
                </Fieldset.Root>
              </form>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
