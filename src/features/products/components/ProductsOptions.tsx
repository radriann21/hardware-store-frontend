import { Button, Menu, Portal } from "@chakra-ui/react";
import { Download, Import, Plus, Upload, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";

interface ProductsOptionsProps {
  onAddProduct: () => void;
}

export const ProductsOptions = ({ onAddProduct }: ProductsOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    switch (value) {
      case "add":
        onAddProduct();
        break;
      default:
        break;
    }
  }

  return (
    <Menu.Root size="sm">
      <Menu.Trigger asChild>
        <Button
          bgColor="#6B60CE"
          color="white"
          size="sm"
          fontWeight="semibold"
          onClick={() => setIsOpen(!isOpen)}
          _hover={{
            bgColor: "#5a4fb8",
          }}
        >
          Opciones
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content fontWeight="bold">
            {
              options.map((option) => (
                <Menu.Item
                  key={option.value}
                  value={option.value}
                  _hover={{ bgColor: option.color, color: "white" }}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.icon}
                  {option.label}
                </Menu.Item>
              ))
            }
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

const options = [
  {
    value: "add",
    label: "Agregar Producto",
    icon: <Plus />,
    color: "#5a4fb8",
  },
  {
    value: "import",
    label: "Importar Excel",
    icon: <Import />,
    color: "green.400",
  },
  {
    value: "export",
    label: "Exportar Excel",
    icon: <Upload />,
    color: "blue.400",
  },
  {
    value: "download-template",
    label: "Descargar Plantilla",
    icon: <Download />,
    color: "orange.400",
  },
];

