import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule, Prisma } from '@prisma/client';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() scheduleData: Prisma.ScheduleCreateInput): Promise<Schedule> {
    return this.schedulesService.create(scheduleData);
  }

  @Get()
  async findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.schedulesService.findOne({ id: id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() scheduleData: Prisma.ScheduleCreateInput) {
    return this.schedulesService.update({
      where: { id: id },
      data: scheduleData,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Schedule> {
    return this.schedulesService.remove({ id: id });
  }
}
