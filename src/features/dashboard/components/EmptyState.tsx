import { Box, Text, VStack } from "@chakra-ui/react";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Box py={16} textAlign="center">
      <VStack gap={3}>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="full"
          display="inline-flex"
        >
          <PackageOpen size={40} color="#718096" />
        </Box>
        <Text color="gray.500" fontSize="lg">
          {message}
        </Text>
      </VStack>
    </Box>
  );
};
