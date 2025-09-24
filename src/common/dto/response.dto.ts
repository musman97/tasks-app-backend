import type {
  PaginatedResponse,
  PaginatedResponseMeta,
  Response,
} from '../interfaces';

export class ResponseDto<D> implements Response<D> {
  success: true;
  data?: D;
  message?: string;

  constructor(data?: D, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }
}

export class PaginatedResponseDto<D> implements PaginatedResponse<D> {
  success: true;
  data: D;
  message?: string | undefined;
  meta: PaginatedResponseMeta;

  constructor(data: D, meta: PaginatedResponseMeta, message?: string) {
    this.success = true;
    this.data = data;
    this.meta = meta;
    this.message = message;
  }
}
