import { z } from "zod";

export const categorySchema = z.object({
  name: z.string("El nombre es requerido.").min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z.string("La descripción es requerida.").min(3, "La descripción debe tener al menos 3 caracteres."),
})

export type CategoryForm = z.infer<typeof categorySchema>