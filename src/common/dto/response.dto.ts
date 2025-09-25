import type { PaginatedResponseMeta } from '../interfaces';

export class ResponseDto<D = undefined> {
  data?: D;
  message?: string;

  constructor(data?: D, message?: string) {
    this.data = data;
    this.message = message;
  }
}

export class PaginatedResponseDto<D> {
  data: D;
  message?: string | undefined;
  meta: PaginatedResponseMeta;

  constructor(data: D, meta: PaginatedResponseMeta, message?: string) {
    this.data = data;
    this.meta = meta;
    this.message = message;
  }
}
