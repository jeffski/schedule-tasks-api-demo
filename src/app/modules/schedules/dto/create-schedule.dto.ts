import { Type } from 'class-transformer';
import { IsInt, IsDateString } from 'class-validator';
import { DateStringTransform } from '../../../../common/transformers/date-string.transformer';

export class CreateScheduleDto {
  @IsInt()
  account_id: number;

  @IsInt()
  agent_id: number;

  @IsDateString()
  @Type(() => Date)
  @DateStringTransform()
  start_time: Date | string;

  @IsDateString()
  @Type(() => Date)
  @DateStringTransform()
  end_time: Date | string;
}
