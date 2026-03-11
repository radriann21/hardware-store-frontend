import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "@/shared/stores/AuthStore";
import { Navigate } from "react-router";

export const Auth = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Flex
      minH="100vh"
      bg="mainBg"
      w="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Box textAlign="center">
        <Heading color="primaryText" fontSize="3xl">
          Iniciar Sesión
        </Heading>
        <Text color="secondaryText" mt="0.2rem" fontSize="lg">
          Usa tus credenciales para iniciar sesión
        </Text>
      </Box>
      <LoginForm />
    </Flex>
  );
};
