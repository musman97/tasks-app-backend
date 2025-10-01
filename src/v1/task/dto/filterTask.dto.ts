import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderBys, PaginationDto } from 'src/common';
import type { OrderBy } from 'src/common';
import { type TaskStatus, TaskStatuses } from 'src/v1/entities';
import { type SortableTaskField, SortableTaskFields } from '../task.types';

export class FilterTaskDto extends PaginationDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsEnum(TaskStatuses)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(OrderBys)
  @IsOptional()
  orderBy?: OrderBy = OrderBys.asc;

  @IsEnum(SortableTaskFields)
  @IsOptional()
  sortBy?: SortableTaskField = SortableTaskFields.title;
}
