import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteCategory } from "@/features/categories/hooks/useCategories";

export const ConfirmDeleteDialog = ({ id }: { id: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = () => {
    deleteCategory(id);
    setOpen(!open);
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          variant="outline"
          size="xs"
          colorPalette="red"
          aria-label="Eliminar"
        >
          <Trash2 size={14} />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>
                ¿Estás seguro de eliminar esta categoría?
              </Dialog.Title>
              <Dialog.Description>
                Esta acción no se puede deshacer.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button size="xs" fontWeight="semibold">
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="red"
                fontWeight="semibold"
                size="xs"
                onClick={handleDelete}
                variant="outline"
              >
                Eliminar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
