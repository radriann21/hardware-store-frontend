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
import { useEditMeasure } from "@/features/measures/hooks/useMeasures";
import { useEffect } from "react";
import type { Measure } from "@/features/measures/interfaces/interfaces";

interface EditMeasureDialogProps {
  measure: Measure;
  isOpen: boolean;
  onClose: () => void;
}

export const EditMeasureDialog = ({ measure, isOpen, onClose }: EditMeasureDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeasureFormValues>({
    resolver: zodResolver(measureSchema),
    defaultValues: {
      name: measure.name,
      abbreviation: measure.abbreviation,
    },
  });

  const { mutate: editMeasure } = useEditMeasure();

  useEffect(() => {
    reset({
      name: measure.name,
      abbreviation: measure.abbreviation,
    });
  }, [measure, reset]);

  const onSubmit = (data: MeasureFormValues) => {
    editMeasure({ id: String(measure.id), data });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Editar Medida</Dialog.Title>
              <Dialog.Description>
                Modifique los campos para actualizar la medida
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
