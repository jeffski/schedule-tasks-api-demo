import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaClient, Type } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: DeepMockProxy<PrismaClient>;

  const task = {
    id: '4ffa267c-2724-4c94-a0bb-8576a4e5a0d2',
    account_id: 12345,
    schedule_id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956',
    start_time: new Date(),
    duration: 2,
    type: Type.WORK,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = task;
    const data = {
      ...rest,
      schedule: undefined,
    };

    prisma.task.create.mockResolvedValueOnce(task);
    expect(service.create(data)).resolves.toBe(task);
  });

  it('should return a list of tasks', () => {
    prisma.task.findMany.mockResolvedValueOnce([task]);
    expect(service.findAll()).resolves.toStrictEqual([task]);
  });

  it('should return a task by id', () => {
    prisma.task.findUnique.mockResolvedValueOnce(task);
    expect(service.findOne({ id: '4ffa267c-2724-4c94-a0bb-8576a4e5a0d2' })).resolves.toBe(task);
  });

  it('should update a task by id', () => {
    prisma.task.update.mockResolvedValueOnce(task);
    expect(service.update({ where: { id: '4ffa267c-2724-4c94-a0bb-8576a4e5a0d2' }, data: task })).resolves.toBe(task);
  });

  it('should return a delete a task', () => {
    prisma.task.delete.mockResolvedValueOnce(task);
    expect(service.remove({ id: '4ffa267c-2724-4c94-a0bb-8576a4e5a0d2' })).resolves.toBe(task);
  });
});
