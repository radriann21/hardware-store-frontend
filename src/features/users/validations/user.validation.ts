import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastname: z.string().min(3, "El apellido debe tener al menos 3 caracteres"),
  username: z.string().min(3, "El username debe tener al menos 3 caracteres"),
  password: z.string().optional().or(z.literal("")),
})

export const editUserSchema = userSchema.omit({ password: true });

export type UserForm = z.infer<typeof userSchema>;
export type EditUserForm = z.infer<typeof editUserSchema>;

