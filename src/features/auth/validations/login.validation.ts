import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string("El nombre de usuario es requerido")
    .min(6, "El nombre de usuario debe tener al menos 6 caracteres"),
  password: z
    .string("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginValidation = z.infer<typeof loginSchema>;
