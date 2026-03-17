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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  providerSchema,
  type ProviderForm,
} from "@/features/suppliers/validations/providers.validation";
import { useCreateProvider } from "@/features/suppliers/hooks/useProviders";
import { useState } from "react";

export const CreateProviderDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProviderForm>({
    resolver: zodResolver(providerSchema),
  });

  const { mutate: createProvider } = useCreateProvider({ reset });

  const onSubmit = (data: ProviderForm) => {
    createProvider(data);
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
          Add Supplier
          <Plus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Crear Proveedor</Dialog.Title>
              <Dialog.Description>
                Complete los campos para crear un nuevo proveedor
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
