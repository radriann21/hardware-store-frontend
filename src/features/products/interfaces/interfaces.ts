import type { GenericPaginationResponse } from "@/shared/interfaces/interfaces";

export interface Product {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  actual_stock: number;
  min_stock: number;
  is_active: boolean;
  measure: {
    id: number;
    name: string;
    abbreviation: string;
  };
  category: {
    id: number;
    name: string;
  }
}

export type ProductResponse = GenericPaginationResponse<Product>;
