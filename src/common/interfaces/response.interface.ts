export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponseMeta {
  pagination: PaginationMeta;
}

export interface Response<D> {
  success: true;
  message?: string;
  data?: D | null;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export interface PaginatedResponse<D> extends Response<D> {
  data: D;
  meta: PaginatedResponseMeta;
}
