export interface User {
  id: string;
  username: string;
}

export interface Pagination {
  page: number;
  limit: number;
  search?: string;
}

export interface GenericPaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type ModalState<T> = 
  | { type: 'closed' }
  | { type: 'create' }
  | { type: 'edit', el: T }
  | { type: 'delete', el: T }