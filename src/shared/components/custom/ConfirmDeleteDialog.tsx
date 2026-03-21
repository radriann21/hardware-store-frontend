import { Dialog, Button, CloseButton, Portal } from "@chakra-ui/react";

interface ConfirmDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  descripcion: string;
  handleDelete: () => void;
}

export const ConfirmDeleteDialog = ({
  isOpen,
  onOpenChange,
  title,
  descripcion,
  handleDelete,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>
                {title}
              </Dialog.Title>
              <Dialog.Description>
                {descripcion}
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
              <CloseButton size="xs" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
