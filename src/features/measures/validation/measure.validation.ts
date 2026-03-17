import { z } from "zod";

export const measureSchema = z.object({
  name: z.string("El nombre es requerido").min(5, "El nombre debe tener al menos 5 caracteres"),
  abbreviation: z
    .string("La abreviatura es requerida")
    .min(2, "La abreviatura debe tener al menos 3 caracteres")
});

export type MeasureFormValues = z.infer<typeof measureSchema>;
