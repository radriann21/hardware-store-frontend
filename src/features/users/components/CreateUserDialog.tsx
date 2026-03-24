import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userSchema,
  editUserSchema,
  type UserForm,
  type EditUserForm,
} from "@/features/users/validations/user.validation";
import { useCreateUser, useEditUser } from "@/features/users/hooks/useUsers";
import type { User } from "../interfaces/interfaces";

interface CreateUserDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  userToEdit?: User | null;
}

export const CreateUserDialog = ({
  isOpen,
  onOpenChange,
  userToEdit,
}: CreateUserDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm | EditUserForm>({
    resolver: zodResolver(userToEdit ? editUserSchema : userSchema),
    defaultValues: userToEdit
      ? {
          name: userToEdit.name,
          lastname: userToEdit.lastname,
          username: userToEdit.username,
        }
      : {
          name: "",
          lastname: "",
          username: "",
          password: "",
        },
  });

  const { mutate: createUser } = useCreateUser();
  const { mutate: editUser } = useEditUser();

  const onSubmit = (data: UserForm | EditUserForm) => {
    if (userToEdit) {
      editUser(
        { id: userToEdit.id, data },
        {
          onSuccess: () => {
            onOpenChange();
            reset();
          },
        },
      );
    } else {
      createUser(data, {
        onSuccess: () => {
          onOpenChange();
          reset();
        },
      });
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>
                {userToEdit ? "Editar Usuario" : "Crear Usuario"}
              </Dialog.Title>
              <Dialog.Description>
                {userToEdit
                  ? "Complete los campos para editar un usuario"
                  : "Complete los campos para crear un nuevo usuario"}
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
                      <Field.ErrorText>
                        {errors.lastname.message}
                      </Field.ErrorText>
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
                      <Field.ErrorText>
                        {errors.username.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root
                    invalid={!!("password" in errors && errors.password)}
                  >
                    <Field.Label>
                      Contraseña
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Contraseña"
                      size="sm"
                    />
                    {"password" in errors && errors.password && (
                      <Field.ErrorText>
                        {errors.password.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Button type="submit" colorPalette="green">
                    Guardar
                  </Button>
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
