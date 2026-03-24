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
  measureSchema,
  type MeasureFormValues,
} from "@/features/measures/validation/measure.validation";
import { useCreateMeasure, useEditMeasure } from "@/features/measures/hooks/useMeasures";
import type { Measure } from "../interfaces/interfaces";

interface CreateMeasureDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  measureToEdit?: Measure | null;
}

export const CreateMeasureDialog = ({
  isOpen,
  onOpenChange,
  measureToEdit,
}: CreateMeasureDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeasureFormValues>({
    resolver: zodResolver(measureSchema),
    defaultValues: measureToEdit
      ? {
          name: measureToEdit.name,
          abbreviation: measureToEdit.abbreviation,
        }
      : {
          name: "",
          abbreviation: "",
        },
  });

  const { mutate: createMeasure } = useCreateMeasure({ reset });
  const { mutate: editMeasure } = useEditMeasure();

  const onSubmit = (data: MeasureFormValues) => {
    if (measureToEdit) {
      editMeasure(
        { id: String(measureToEdit.id), data },
        {
          onSuccess: () => {
            onOpenChange();
            reset();
          },
        },
      );
    } else {
      createMeasure(data, {
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
                {measureToEdit ? "Editar Medida" : "Crear Medida"}
              </Dialog.Title>
              <Dialog.Description>
                {measureToEdit
                  ? "Modifique los campos para actualizar la medida"
                  : "Complete los campos para crear una nueva medida"}
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
