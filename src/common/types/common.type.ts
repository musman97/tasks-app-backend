import { Request } from 'express';
import { PaginatedResponseDto, ResponseDto } from '../dto';
import type { User } from 'src/v1/entities';

export type PromisfiedResponseDto<D = undefined> = Promise<ResponseDto<D>>;
export type PromisfiedPaginatedResponseDto<D> = Promise<
  PaginatedResponseDto<D>
>;

export interface PaginationQuery {
  page: number;
  limit: number;
}

export interface PaginationInfo {
  skip: number;
  limit: number;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
