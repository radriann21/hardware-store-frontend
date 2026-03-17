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
import { useEditProvider } from "@/features/suppliers/hooks/useProviders";
import { useEffect } from "react";
import type { Provider } from "@/features/suppliers/interfaces/interfaces";

interface EditProviderDialogProps {
  provider: Provider;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProviderDialog = ({ provider, isOpen, onClose }: EditProviderDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderForm>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: provider.name,
      contact_name: provider.contact_name,
      phone_number: provider.phone_number,
      address: provider.address,
    },
  });

  const { mutate: editProvider } = useEditProvider();

  useEffect(() => {
    reset({
      name: provider.name,
      contact_name: provider.contact_name,
      phone_number: provider.phone_number,
      address: provider.address,
    });
  }, [provider, reset]);

  const onSubmit = (data: ProviderForm) => {
    editProvider({ id: provider.id, data });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Editar Proveedor</Dialog.Title>
              <Dialog.Description>
                Modifique los campos para actualizar el proveedor
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
