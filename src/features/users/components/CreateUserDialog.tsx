import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userSchema,
  type UserForm,
} from "@/features/users/validations/user.validation";
import { useCreateUser } from "@/features/users/hooks/useUsers";
import { useState } from "react";

export const CreateUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const { mutate: createUser } = useCreateUser({ reset });

  const onSubmit = (data: UserForm) => {
    createUser(data);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <Dialog.Trigger asChild>
        <Button
          bgColor="#6B60CE"
          color="white"
          size="sm"
          fontWeight="semibold"
          _hover={{
            bgColor: "#5a4fb8",
          }}
        >
          Agregar Usuario
          <Plus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Crear Usuario</Dialog.Title>
              <Dialog.Description>
                Complete los campos para crear un nuevo usuario
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
                      Contraseña
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder="Contraseña"
                      size="sm"
                    />
                    {errors.password && (
                      <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Button type="submit" colorPalette="green">Guardar</Button>
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
