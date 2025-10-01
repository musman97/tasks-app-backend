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

export type Nullable<T> = T | null;

export type EnumType<T extends Record<string, unknown>> = T[keyof T];

export const OrderBys = {
  asc: 'ASC',
  desc: 'DESC',
} as const;
export type OrderBy = EnumType<typeof OrderBys>;
