export interface User {
  id: string;
  username: string;
}

export interface Pagination {
  page: number;
  limit: number;
  search?: string;
}
