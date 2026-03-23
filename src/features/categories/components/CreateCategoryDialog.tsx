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
import { useCreateCategory, useEditCategory } from "@/features/categories/hooks/useCategories";
import type { Category } from "../interfaces/interfaces";

interface CreateCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: () => void;
  categoryToEdit?: Category | null;
}

export const CreateCategoryDialog = ({
  isOpen,
  onOpenChange,
  categoryToEdit,
}: CreateCategoryDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryToEdit
      ? {
          name: categoryToEdit.name,
          description: categoryToEdit.description,
        }
      : {
          name: "",
          description: "",
        },
  });

  const { mutate: createCategory } = useCreateCategory({ reset });
  const { mutate: editCategory } = useEditCategory();

  const onSubmit = (data: CategoryForm) => {
    if (categoryToEdit) {
      editCategory(
        { id: categoryToEdit.id, data },
        {
          onSuccess: () => {
            onOpenChange();
            reset();
          },
        },
      );
    } else {
      createCategory(data, {
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
                {categoryToEdit ? "Editar Categoria" : "Crear Categoria"}
              </Dialog.Title>
              <Dialog.Description>
                {categoryToEdit
                  ? "Modifique los campos para actualizar la categoria"
                  : "Complete los campos para crear una nueva categoria"}
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
