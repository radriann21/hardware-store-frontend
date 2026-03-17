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
  measureSchema,
  type MeasureFormValues,
} from "@/features/measures/validation/measure.validation";
import { useCreateMeasure } from "@/features/measures/hooks/useMeasures";
import { useState } from "react";

export const CreateMeasureDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeasureFormValues>({
    resolver: zodResolver(measureSchema),
  });

  const { mutate: createMeasure } = useCreateMeasure({ reset });

  const onSubmit = (data: MeasureFormValues) => {
    createMeasure(data);
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
          Agregar Medida
          <Plus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Crear Medida</Dialog.Title>
              <Dialog.Description>
                Complete los campos para crear una nueva medida
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
                      placeholder="Nombre de la medida"
                      size="sm"
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.abbreviation}>
                    <Field.Label>
                      Abreviatura
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("abbreviation")}
                      placeholder="Abreviatura de la medida"
                      size="sm"
                    />
                    {errors.abbreviation && (
                      <Field.ErrorText>{errors.abbreviation.message}</Field.ErrorText>
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
