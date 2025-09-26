import { HttpStatus } from '@nestjs/common';
import type { PaginatedResponseMeta } from '../interfaces';

export class ResponseDto<D = undefined> {
  data?: D | null;
  message?: string;
  statusCode?: HttpStatus;

  constructor(statusCode = HttpStatus.OK, data?: D, message?: string) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class PaginatedResponseDto<D> {
  data: D | null;
  message?: string | undefined;
  meta: PaginatedResponseMeta;
  statusCode?: HttpStatus;

  constructor(data: D, meta: PaginatedResponseMeta, message?: string) {
    this.data = data;
    this.meta = meta;
    this.message = message;
    this.statusCode = HttpStatus.OK;
  }
}
