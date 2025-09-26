import { PaginatedResponseDto, ResponseDto } from '../dto';

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
