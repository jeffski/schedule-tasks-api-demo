import { Module } from '@nestjs/common';
import { SchedulesModule } from './app/modules/schedules/schedules.module';

@Module({
  imports: [SchedulesModule],
})
export class AppModule {}
