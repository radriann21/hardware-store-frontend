import type { Product } from "@/features/products/interfaces/interfaces";
import type { GenericPaginationResponse } from "@/shared/interfaces/interfaces";
import type { User } from "@/features/users/interfaces/interfaces";

export enum MovementType {
  ENTRY = "ENTRY",
  EXIT = "EXIT",
  ADJUSTMENT = "ADJUSTMENT",
}

export interface Movement {
  id: number;
  product: Product;
  user: Pick<User, "id" | "name" | "lastname" | "username">;
  quantity: number;
  type: MovementType;
  description: string;
  created_at: string;
}

export type MovementResponse = GenericPaginationResponse<Movement[]>;
