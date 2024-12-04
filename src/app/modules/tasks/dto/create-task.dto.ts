import { Transform, Type } from 'class-transformer';
import { IsInt, IsDateString, IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';
import { DateStringTransform } from '../../../../common/transformers/date-string.transformer';
import { Prisma, Type as TaskType } from '@prisma/client';

export class CreateTaskDto implements Prisma.TaskCreateInput {
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
