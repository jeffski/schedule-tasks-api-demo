import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, Prisma } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() taskData: Prisma.TaskCreateInput): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksService.findOne({ id: id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() taskData: Prisma.TaskCreateInput) {
    return this.tasksService.update({
      where: { id: id },
      data: taskData,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove({ id: id });
  }
}
