import { PasswordInput } from "@/shared/components/ui/password-input";
import { Box, Button, Field, Fieldset, Input } from "@chakra-ui/react";
import {
  loginSchema,
  type LoginValidation,
} from "@/features/auth/validations/login.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginQuery } from "../hooks/useLoginQuery";

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValidation>({
    resolver: zodResolver(loginSchema),
  });
  
  const { mutate: login } = useLoginQuery();

  const onSubmit = (data: LoginValidation) => {
    login(data);
  };

  return (
    <Box p="1.5rem" rounded="md" bg="white" shadow="sm" w="420px" mt="1rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset.Root>
          <Field.Root invalid={!!errors.username}>
            <Field.Label fontWeight="semibold">
              Nombre de Usuario
              <span style={{ color: "red" }}>*</span>
            </Field.Label>
            <Input
              placeholder="Tu nombre de usuario..."
              {...register("username")}
              />
              {errors.username && (
                <Field.ErrorText>{errors.username.message}</Field.ErrorText>
              )}
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label fontWeight="semibold">
              Contraseña
              <span style={{ color: "red" }}>*</span>
            </Field.Label>
            <PasswordInput
              placeholder="Tu contraseña..."
              {...register("password")}
            />
            {errors.password && (
              <Field.ErrorText>{errors.password.message}</Field.ErrorText>
            )}
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
      </form>
    </Box>
  );
};
