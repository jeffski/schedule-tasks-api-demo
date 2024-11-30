import { Module } from '@nestjs/common';
import { SchedulesModule } from './app/modules/schedules/schedules.module';
import { TasksModule } from './app/modules/tasks/tasks.module';

@Module({
  imports: [SchedulesModule, TasksModule],
})
export class AppModule {}
