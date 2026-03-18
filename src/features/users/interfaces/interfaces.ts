export interface User {
  id: string;
  name: string;
  lastname: string;
  username: string;
  is_active: boolean;
  created_at: string;
}

export interface UsersResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}