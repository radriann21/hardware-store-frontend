import { z } from "zod";
import { MovementType } from "@/features/movements/interfaces/interfaces";

export const movementSchema = z.object({
  product_id: z.string("El producto es requerido"),
  quantity: z.number("La cantidad es requerida"),
  type: z.enum(Object.values(MovementType), "El tipo es requerido"),
  description: z.string("La descripción es requerida"),
});

export type MovementFormData = z.infer<typeof movementSchema>;