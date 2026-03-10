import { PasswordInput } from "@/shared/components/ui/password-input";
import { Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";

export const LoginForm = () => {
  return (
    <Box p="1.5rem" rounded="md" bg="white" shadow="sm" w="420px" mt="1rem">
      <Fieldset.Root>
        <Field.Root>
          <Field.Label fontWeight="semibold">Nombre de Usuario</Field.Label>
          <Input placeholder="Tu nombre de usuario..." />
        </Field.Root>
        <Field.Root>
          <Field.Label fontWeight="semibold">Contraseña</Field.Label>
          <PasswordInput placeholder="Tu contraseña..." />
        </Field.Root>
        <Button
          type="submit"
          bgColor="accentColor"
          fontWeight="semibold"
          _hover={{ bgColor: "accentColorHover" }}
        >
          Iniciar Sesión
        </Button>
      </Fieldset.Root>
    </Box>
  );
};
