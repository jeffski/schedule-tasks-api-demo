import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { Prisma, PrismaClient, Schedule } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let prisma: DeepMockProxy<PrismaClient>;

  const schedule: Schedule = {
    id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956',
    account_id: 12345,
    agent_id: 98765,
    start_time: new Date(),
    end_time: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchedulesController],
      providers: [SchedulesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<SchedulesController>(SchedulesController);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a schedule', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = schedule;
    const data: Prisma.ScheduleCreateInput = {
      ...rest,
    };

    prisma.schedule.create.mockResolvedValueOnce(schedule);
    expect(controller.create(data)).resolves.toBe(schedule);
  });

  it('should return a list of schedules', () => {
    prisma.schedule.findMany.mockResolvedValueOnce([schedule]);
    expect(controller.findAll()).resolves.toStrictEqual([schedule]);
  });

  it('should return a schedule by id', () => {
    prisma.schedule.findUnique.mockResolvedValueOnce(schedule);
    expect(controller.findOne('e40fe564-2fb5-47b8-a01a-378d70c9b956')).resolves.toBe(schedule);
  });

  it('should update a schedule by id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = schedule;
    const data: Prisma.ScheduleCreateInput = {
      ...rest,
    };

    prisma.schedule.update.mockResolvedValueOnce(schedule);
    expect(controller.update('e40fe564-2fb5-47b8-a01a-378d70c9b956', data)).resolves.toBe(schedule);
  });

  it('should return a delete a schedule', () => {
    prisma.schedule.delete.mockResolvedValueOnce(schedule);
    expect(controller.remove('e40fe564-2fb5-47b8-a01a-378d70c9b956')).toBeUndefined();
  });
});
