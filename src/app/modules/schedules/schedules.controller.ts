import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { Schedule } from '@prisma/client';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() scheduleData: CreateScheduleDto): Promise<Schedule> {
    return this.schedulesService.create(scheduleData);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Schedule> {
    return this.schedulesService.findOne({
      where: { id },
      include: { tasks: true },
    });
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() scheduleData: UpdateScheduleDto): Promise<Schedule> {
    return this.schedulesService.update({
      where: { id },
      data: scheduleData,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.schedulesService.remove({ id: id });
  }
}
