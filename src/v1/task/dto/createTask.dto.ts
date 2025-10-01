import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { type TaskStatus, TaskStatuses } from 'src/v1/entities';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatuses)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
