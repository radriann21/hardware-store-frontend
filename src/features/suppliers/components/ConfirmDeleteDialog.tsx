import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteProvider } from "@/features/suppliers/hooks/useProviders";

export const ConfirmDeleteDialog = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { mutate: deleteProvider } = useDeleteProvider();

  const handleDelete = () => {
    deleteProvider(id);
    setOpen(!open);
  };

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          variant="outline"
          size="sm"
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
                ¿Estás seguro de eliminar este proveedor?
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
