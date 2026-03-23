import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  providerSchema,
  type ProviderForm,
} from "@/features/suppliers/validations/providers.validation";
import { useCreateProvider, useEditProvider } from "@/features/suppliers/hooks/useProviders";
import type { Provider } from "../interfaces/interfaces";

interface CreateProviderDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  providerToEdit?: Provider | null;
}

export const CreateProviderDialog = ({
  isOpen,
  onOpenChange,
  providerToEdit,
}: CreateProviderDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderForm>({
    resolver: zodResolver(providerSchema),
    defaultValues: providerToEdit
      ? {
          name: providerToEdit.name,
          contact_name: providerToEdit.contact_name,
          phone_number: providerToEdit.phone_number,
          address: providerToEdit.address,
        }
      : {
          name: "",
          contact_name: "",
          phone_number: "",
          address: "",
        },
  });

  const { mutate: createProvider } = useCreateProvider({ reset });
  const { mutate: editProvider } = useEditProvider();

  const onSubmit = (data: ProviderForm) => {
    if (providerToEdit) {
      editProvider(
        { id: providerToEdit.id, data },
        {
          onSuccess: () => {
            onOpenChange();
            reset();
          },
        },
      );
    } else {
      createProvider(data, {
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
                {providerToEdit ? "Editar Proveedor" : "Crear Proveedor"}
              </Dialog.Title>
              <Dialog.Description>
                {providerToEdit
                  ? "Modifique los campos para actualizar el proveedor"
                  : "Complete los campos para crear un nuevo proveedor"}
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
                      placeholder="Nombre del proveedor"
                      size="sm"
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.contact_name}>
                    <Field.Label>
                      Nombre del contacto
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("contact_name")}
                      placeholder="Nombre del contacto"
                      size="sm"
                    />
                    {errors.contact_name && (
                      <Field.ErrorText>{errors.contact_name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.phone_number}>
                    <Field.Label>
                      Número de teléfono
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("phone_number")}
                      placeholder="Número de teléfono"
                      size="sm"
                    />
                    {errors.phone_number && (
                      <Field.ErrorText>{errors.phone_number.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.address}>
                    <Field.Label>
                      Dirección
                    </Field.Label>
                    <Textarea
                      {...register("address")}
                      placeholder="Dirección del proveedor"
                      size="sm"
                    />
                    {errors.address && (
                      <Field.ErrorText>{errors.address.message}</Field.ErrorText>
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
