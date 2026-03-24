import type { GenericPaginationResponse } from "@/shared/interfaces/interfaces";

export interface User {
  id: string;
  name: string;
  lastname: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

export type UsersResponse = GenericPaginationResponse<User>;