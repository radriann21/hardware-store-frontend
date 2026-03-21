import { z } from "zod";

export const productSchema = z.object({
  name: z.string("El nombre es requerido.").min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z.string("La descripción es requerida.").min(10, "La descripción debe tener al menos 10 caracteres."),
  price_usd: z.number("El precio en USD es requerido."),
  actual_stock: z.number("El stock actual es requerido.").min(1, "El stock actual debe ser mayor a 0"),
  min_stock: z.number("El stock mínimo es requerido.").min(1, "El stock mínimo debe ser mayor a 0"),
  measure_id: z.number("La medida es requerida."),
  category_id: z.number("La categoría es requerida."),
  tax_percentage: z.number("El porcentaje de impuesto es requerido.").optional().default(16),
})

export type ProductFormData = z.input<typeof productSchema>;