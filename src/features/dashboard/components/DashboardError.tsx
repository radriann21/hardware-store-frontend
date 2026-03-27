import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface DashboardErrorProps {
  onRetry: () => void;
}

export const DashboardError = ({ onRetry }: DashboardErrorProps) => {
  return (
    <Box my="10px">
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="white"
        p={12}
        borderRadius="lg"
        border="1px solid"
        borderColor="red.200"
        textAlign="center"
      >
        <Box
          bg="red.50"
          p={4}
          borderRadius="full"
          mb={4}
        >
          <AlertCircle size={48} color="#E53E3E" />
        </Box>
        <Heading size="lg" mb={2} color="gray.800">
          Error al cargar el dashboard
        </Heading>
        <Text color="gray.600" mb={6} maxW="md">
          No se pudieron cargar los datos del dashboard. Por favor, intenta nuevamente.
        </Text>
        <Button
          colorScheme="red"
          onClick={onRetry}
        >
          <RefreshCw size={18} style={{ marginRight: '8px' }} />
          Reintentar
        </Button>
      </Flex>
    </Box>
  );
};
