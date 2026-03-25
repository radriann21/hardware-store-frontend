import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { Measure } from "@/features/measures/interfaces/interfaces";

interface MeasureCardProps {
  measure: Measure;
  onEdit?: (measure: Measure) => void;
  onDelete?: (measure: Measure) => void;
}

export const MeasureCard = ({
  measure,
  onEdit,
  onDelete,
}: MeasureCardProps) => {
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
        animation="fade-in"
        animationDuration="0.4s"
        style={{
          animationDelay: `${measure.id * 0.03}s`,
          opacity: 0,
          animationFillMode: "forwards",
        }}
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
          {!["PC", "BOX", "KG", "M", "PCK"].includes(measure.abbreviation) &&
            "Unidad de medida"}
        </Text>

        <Flex
          w="full"
          gap={2}
          borderTop="1px solid"
          borderColor="gray.200"
          pt={4}
        >
          {onEdit && (
            <Button
              flex={1}
              size="sm"
              fontWeight="normal"
              colorPalette="green"
              variant="outline"
              onClick={() => onEdit(measure)}
            >
              <Pencil size={14} />
              Editar
            </Button>
          )}
          {onDelete && (
            <Tooltip content="Eliminar">
              <IconButton
                size="sm"
                variant="ghost"
                colorPalette="red"
                aria-label="Eliminar medida"
                onClick={() => onDelete(measure)}
              >
                <Trash2 size={14} />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      </Box>
    </>
  );
};
