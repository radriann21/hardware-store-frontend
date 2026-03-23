import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text
} from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { Category } from "@/features/categories/interfaces/interfaces";

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
  return (
    <Box
      as="article"
      p={4}
      rounded="md"
      bg="white"
      shadow="sm"
      _hover={{
        shadow: "md",
      }}
    >
      <Box as="header">
        <Heading as="h3" fontSize="lg" color="gray.900">
          {category.name}
        </Heading>
        <Text color="gray.500">{category.description}</Text>
      </Box>
      <Flex w="full" gap={2} mt="10px"> 
        <Button
          flex={1}
          size="xs"
          w="100%"
          fontWeight="normal"
          colorPalette="green"
          variant="outline"
          onClick={() => onEdit?.(category)}
        >
          <Pencil size={14} />
          Edit
        </Button>
        {
          onDelete && (
            <Tooltip content="Eliminar">
              <IconButton
                size="xs"
                variant="ghost"
                colorPalette="red"
                aria-label="Eliminar categoría"
                onClick={() => onDelete(category)}
              >
                <Trash2 size={14} />
              </IconButton>
            </Tooltip>
          )
        }
      </Flex>
    </Box>
  );
};
