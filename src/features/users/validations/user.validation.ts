import { z } from "zod";

export const userSchema = z.object({
  name: z.string("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
  lastname: z
    .string("El apellido es requerido")
    .min(3, "El apellido debe tener al menos 3 caracteres"),
  username: z
    .string("El username es requerido")
    .min(3, "El username debe tener al menos 3 caracteres"),
  password: z
    .string("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const editUserSchema = z.object({
  name: z.string("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
  lastname: z
    .string("El apellido es requerido")
    .min(3, "El apellido debe tener al menos 3 caracteres"),
  username: z
    .string("El username es requerido")
    .min(3, "El username debe tener al menos 3 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .optional()
    .or(z.literal("")),
});

export type UserForm = z.infer<typeof userSchema>;
export type EditUserForm = z.infer<typeof editUserSchema>;
