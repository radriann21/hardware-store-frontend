import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllProducts } from "@/features/products/hooks/useProducts";
import { useCreateMovement } from "@/features/movements/hooks/useMovements";
import { useAuthStore } from "@/shared/stores/AuthStore";
import {
  movementSchema,
  type MovementFormData,
} from "@/features/movements/validations/movement.validation";

interface MovementDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MovementDialog = ({ isOpen, onClose }: MovementDialogProps) => {
  const { user } = useAuthStore();
  const { mutate: createMovement } = useCreateMovement();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovementFormData>({
    resolver: zodResolver(movementSchema),
  });

  const { data: products } = useGetAllProducts({ page: 1, limit: 10 });

  const onSubmit = (data: MovementFormData) => {
    const movementData = {
      ...data,
      user_id: user?.id,
    };

    createMovement(movementData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Crear Nuevo Movimiento</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Fieldset.Root>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Field.Root invalid={!!errors.product_id}>
                    <Field.Label>Producto</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        {...register("product_id")}
                        placeholder="Elige un producto"
                      >
                        {products?.data.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>
                      {errors.product_id?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.quantity} my="10px">
                    <Field.Label>Cantidad</Field.Label>
                    <Input
                      {...register("quantity", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      placeholder="Cantidad"
                    />
                    <Field.ErrorText>
                      {errors.quantity?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.type} mb="10px">
                    <Field.Label>Tipo de Movimiento</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        {...register("type")}
                        placeholder="Elige un tipo"
                      >
                        <option value="ENTRY">Entrada</option>
                        <option value="EXIT">Salida</option>
                        <option value="ADJUSTMENT">Ajuste</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.type?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.description}>
                    <Field.Label>Descripción</Field.Label>
                    <Textarea
                      placeholder="Descripción"
                      {...register("description")}
                    />
                    <Field.ErrorText>
                      {errors.description?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Button
                    type="submit"
                    mt="10px"
                    width="100%"
                    fontSize="xs"
                    fontWeight="semibold"
                  >
                    Registrar Movimiento
                  </Button>
                </form>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
