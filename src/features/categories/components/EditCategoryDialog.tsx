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
  categorySchema,
  type CategoryForm,
} from "@/features/categories/validations/category.validation";
import { useEditCategory } from "@/features/categories/hooks/useCategories";
import { useEffect } from "react";
import type { Category } from "@/features/categories/interfaces/interfaces";

interface EditCategoryDialogProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export const EditCategoryDialog = ({ category, isOpen, onClose }: EditCategoryDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  const { mutate: editCategory } = useEditCategory();

  useEffect(() => {
    reset({
      name: category.name,
      description: category.description,
    });
  }, [category, reset]);

  const onSubmit = (data: CategoryForm) => {
    editCategory({ id: category.id, data });
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Editar Categoria</Dialog.Title>
              <Dialog.Description>
                Modifique los campos para actualizar la categoria
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
                      placeholder="Nombre de la categoria"
                      size="sm"
                    />
                    {errors.name && (
                      <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root invalid={!!errors.description}>
                    <Field.Label>
                      Descripción
                      <span style={{ color: "red" }}>*</span>
                    </Field.Label>
                    <Input
                      {...register("description")}
                      placeholder="Descripción de la categoria"
                      size="sm"
                    />
                    {errors.description && (
                      <Field.ErrorText>{errors.description.message}</Field.ErrorText>
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
