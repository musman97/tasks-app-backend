import { PaginatedResponseDto, ResponseDto } from '../dto';

export type PromisfiedResponseDto<D = undefined> = Promise<ResponseDto<D>>;
export type PromisfiedPaginatedResponseDto<D> = Promise<
  PaginatedResponseDto<D>
>;
