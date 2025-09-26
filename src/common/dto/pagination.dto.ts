import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_REOURCE_LIMIT } from '../constants';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = DEFAULT_REOURCE_LIMIT;
}
