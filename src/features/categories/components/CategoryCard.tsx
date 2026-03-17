import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import type { Category } from "@/features/categories/interfaces/interfaces";
import { useState } from "react";

export const CategoryCard = (category: Category) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
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
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil size={14} />
            Edit
          </Button>
          <ConfirmDeleteDialog id={category.id} />
        </Flex>
      </Box>
      <EditCategoryDialog 
        category={category} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      />
    </>
  );
};
