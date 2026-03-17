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
  categorySchema,
  type CategoryForm,
} from "@/features/categories/validations/category.validation";
import { useCreateCategory } from "@/features/categories/hooks/useCategories";
import { useState } from "react";

export const CreateCategoryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate: createCategory } = useCreateCategory({ reset });

  const onSubmit = (data: CategoryForm) => {
    createCategory(data);
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
          Agregar Categoria
          <Plus />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>Crear Categoria</Dialog.Title>
              <Dialog.Description>
                Complete los campos para crear una nueva categoria
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
