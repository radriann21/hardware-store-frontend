import { z } from "zod";

export const providerSchema = z.object({
  name: z.string("El nombre es requerido").min(3, "El nombre debe tener al menos 3 caracteres"),
  phone_number: z.string("El número de teléfono es requerido").min(5, "El número de teléfono debe tener al menos 5 caracteres"),
  contact_name: z.string("El nombre del contacto es requerido").min(3, "El nombre del contacto debe tener al menos 3 caracteres"),
  address: z.string().optional(),
});

export type ProviderForm = z.infer<typeof providerSchema>;