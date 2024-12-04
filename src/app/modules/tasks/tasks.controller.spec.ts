import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaClient, Task, Type } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { CreateTaskDto, TaskType } from './dto/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let prisma: DeepMockProxy<PrismaClient>;

  const request: CreateTaskDto = {
    account_id: 12345,
    schedule_id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956',
    schedule: undefined,
    start_time: new Date(),
    duration: 2,
    type: TaskType.WORK,
  };

  const response: Task = {
    id: '4ffa267c-2724-4c94-a0bb-8576a4e5a0d2',
    account_id: 12345,
    schedule_id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956',
    start_time: new Date(),
    duration: 2,
    type: Type.WORK,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<TasksController>(TasksController);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', () => {
    prisma.task.create.mockResolvedValueOnce(response);
    expect(controller.create(request)).resolves.toBe(response);
  });

  it('should return a list of tasks', () => {
    prisma.task.findMany.mockResolvedValueOnce([response]);
    expect(controller.findAll()).resolves.toStrictEqual([response]);
  });

  it('should return a task by id', () => {
    prisma.task.findUnique.mockResolvedValueOnce(response);
    expect(controller.findOne('4ffa267c-2724-4c94-a0bb-8576a4e5a0d2')).resolves.toBe(response);
  });

  it('should update a task by id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { duration, ...rest } = response;
    const updatedResponse = {
      ...rest,
      duration: 6,
    };

    prisma.task.update.mockResolvedValueOnce(updatedResponse);
    expect(controller.update('4ffa267c-2724-4c94-a0bb-8576a4e5a0d2', { duration: 6 })).resolves.toBe(updatedResponse);
  });

  it('should return a delete a task', () => {
    prisma.task.delete.mockResolvedValueOnce(response);
    expect(controller.remove('4ffa267c-2724-4c94-a0bb-8576a4e5a0d2')).toBeUndefined();
  });
});
