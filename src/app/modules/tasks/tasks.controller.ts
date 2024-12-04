import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() taskData: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.findOne({ id: id });
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() taskData: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update({
      where: { id: id },
      data: taskData,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.tasksService.remove({ id: id });
  }
}
