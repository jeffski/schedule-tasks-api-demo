import { Transform, Type } from 'class-transformer';
import { IsInt, IsDateString, IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';
import { DateStringTransform } from '../../../../common/transformers/date-string.transformer';

export enum TaskType {
  BREAK = 'BREAK',
  WORK = 'WORK',
}

export class CreateTaskDto {
  @IsInt()
  account_id: number;

  @IsUUID()
  schedule_id: string;

  @IsDateString()
  @Type(() => Date)
  @DateStringTransform()
  start_time: Date | string;

  @IsInt()
  duration: number;

  @IsEnum(TaskType)
  @IsString()
  @Transform(({ value }) => value.toUpperCase())
  type: TaskType;

  @IsOptional()
  schedule: any;
}
