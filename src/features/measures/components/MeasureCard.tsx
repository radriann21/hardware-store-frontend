import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Pencil } from "lucide-react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { EditMeasureDialog } from "./EditMeasureDialog";
import type { Measure } from "@/features/measures/interfaces/interfaces";
import { useState } from "react";

export const MeasureCard = (measure: Measure) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <Box
        as="article"
        p={6}
        rounded="lg"
        bg="white"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        _hover={{
          shadow: "md",
        }}
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="semibold">
            {measure.name}
          </Heading>
          <Badge
            colorPalette="purple"
            variant="subtle"
            size="sm"
            px={3}
            py={1}
            rounded="full"
          >
            {measure.abbreviation}
          </Badge>
        </Flex>

        <Text color="gray.500" fontSize="sm" mb={4}>
          {measure.abbreviation === "PC" && "Individual unit"}
          {measure.abbreviation === "BOX" && "Box of units"}
          {measure.abbreviation === "KG" && "Weight unit"}
          {measure.abbreviation === "M" && "Length unit"}
          {measure.abbreviation === "PCK" && "Package of units"}
          {!["PC", "BOX", "KG", "M", "PCK"].includes(measure.abbreviation) && "Unidad de medida"}
        </Text>

        <Flex w="full" gap={2} borderTop="1px solid" borderColor="gray.200" pt={4}>
          <Button
            flex={1}
            size="sm"
            fontWeight="normal"
            colorPalette="green"
            variant="outline"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil size={14} />
            Editar
          </Button>
          <ConfirmDeleteDialog id={String(measure.id)} />
        </Flex>
      </Box>
      <EditMeasureDialog 
        measure={measure} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      />
    </>
  );
};
