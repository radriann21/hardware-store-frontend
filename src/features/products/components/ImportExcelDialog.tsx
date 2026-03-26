import { Dialog, Button, CloseButton, Portal, Box, Text } from "@chakra-ui/react";
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { useImportProductsFromExcel } from "@/features/products/hooks/useProducts";

interface ImportExcelDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImportExcelDialog = ({
  isOpen,
  onOpenChange,
}: ImportExcelDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: importFile, isPending } = useImportProductsFromExcel()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel")) {
      setSelectedFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = () => {
    if (selectedFile) {
      importFile(selectedFile, {
        onSuccess: () => {
          setSelectedFile(null);
          onOpenChange(false);
        },
      });
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header display="flex" flexDirection="column" gap={2}>
              <Dialog.Title>
                Importar Productos desde Excel
              </Dialog.Title>
              <Dialog.Description>
                Selecciona un archivo Excel (.xlsx, .xls) para importar productos
              </Dialog.Description>
            </Dialog.Header>
            
            <Dialog.Body>
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                border="2px dashed"
                borderColor={isDragging ? "purple.500" : "gray.300"}
                borderRadius="md"
                padding="40px"
                textAlign="center"
                cursor="pointer"
                transition="all 0.2s"
                backgroundColor={isDragging ? "purple.50" : "gray.50"}
                _hover={{
                  borderColor: "purple.400",
                  backgroundColor: "purple.50"
                }}
                onClick={handleButtonClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                
                <Upload size={48} style={{ margin: "0 auto", color: "#6B60CE" }} />
                
                <Text mt={4} fontWeight="semibold" color="gray.700">
                  {selectedFile ? selectedFile.name : "Arrastra tu archivo aquí o haz clic para seleccionar"}
                </Text>
                
                <Text mt={2} fontSize="sm" color="gray.500">
                  Formatos soportados: .xlsx, .xls
                </Text>
              </Box>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button size="xs" fontWeight="semibold" onClick={handleClose}>
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button
                colorPalette="purple"
                fontWeight="semibold"
                size="xs"
                onClick={handleImport}
                disabled={!selectedFile || isPending}
                variant="solid"
              >
                {isPending ? "Importando..." : "Importar"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" onClick={handleClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
