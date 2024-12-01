import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaClient, Schedule } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('SchedulesService', () => {
  let service: SchedulesService;
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
      providers: [SchedulesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<SchedulesService>(SchedulesService);
    prisma = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a schedule', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = schedule;
    const data = {
      ...rest,
    };

    prisma.schedule.create.mockResolvedValueOnce(schedule);
    expect(service.create(data)).resolves.toBe(schedule);
  });

  it('should return a list of schedules', () => {
    prisma.schedule.findMany.mockResolvedValueOnce([schedule]);
    expect(service.findAll()).resolves.toStrictEqual([schedule]);
  });

  it('should return a schedule by id', () => {
    prisma.schedule.findUnique.mockResolvedValueOnce(schedule);
    expect(
      service.findOne({ where: { id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956' }, include: { tasks: true } }),
    ).resolves.toBe(schedule);
  });

  it('should update a schedule by id', () => {
    prisma.schedule.update.mockResolvedValueOnce(schedule);
    expect(service.update({ where: { id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956' }, data: schedule })).resolves.toBe(
      schedule,
    );
  });

  it('should return a delete a schedule', () => {
    prisma.schedule.delete.mockResolvedValueOnce(schedule);
    expect(service.remove({ id: 'e40fe564-2fb5-47b8-a01a-378d70c9b956' })).resolves.toBe(schedule);
  });
});
