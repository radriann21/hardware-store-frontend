import { GridItem, Heading, VStack, Box, Text, Flex } from "@chakra-ui/react";
import type { RecentMovement } from "../interfaces/dashboard.interface";
import { format } from "date-fns";
import { EmptyState } from "./EmptyState";

interface RecentMovementViewProps {
  data: RecentMovement[];
}

const getMovementColor = (type: RecentMovement["type"]) => {
  switch (type) {
    case "ENTRY":
      return "green.500";
    case "EXIT":
      return "red.500";
    case "ADJUSTMENT":
      return "gray.500";
    default:
      return "gray.500";
  }
};

const formatQuantity = (quantity: number, type: RecentMovement["type"]) => {
  const sign = type === "ENTRY" ? "+" : type === "EXIT" ? "-" : "";
  return `${sign}${quantity} units`;
};

export const RecentMovementView = ({ data }: RecentMovementViewProps) => {
  return (
    <GridItem 
      colSpan={4} 
      bg="white" 
      p="2rem" 
      rounded="lg" 
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <Heading as="h3" size="md" mb={6} color="gray.800">
        Movimientos Recientes
      </Heading>
      <VStack gap={0} align="stretch">
        {data.length === 0 ? (
          <EmptyState message="No hay movimientos recientes" />
        ) : (
          data.map((movement) => (
            <Box
              key={movement.id}
              py={4}
              px={2}
              borderRadius="md"
              borderBottom="1px solid"
              borderColor="gray.100"
              _last={{ borderBottom: "none" }}
              _hover={{ bg: "gray.50", transform: "translateX(4px)" }}
              transition="all 0.2s"
            >
              <Flex justify="space-between" align="flex-start">
                <Box flex={1}>
                  <Text fontWeight="semibold" fontSize="md" mb={1}>
                    {movement.product.name}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {movement.description}
                  </Text>
                </Box>
                <Flex direction="column" align="flex-end" gap={1}>
                  <Text
                    fontWeight="semibold"
                    color={getMovementColor(movement.type)}
                    fontSize="sm"
                  >
                    {formatQuantity(movement.quantity, movement.type)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {format(new Date(movement.created_at), "M/d/yyyy")}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          ))
        )}
      </VStack>
    </GridItem>
  );
}