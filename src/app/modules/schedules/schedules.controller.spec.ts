import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { PrismaClient, Schedule } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { CreateScheduleDto } from './dto/create-schedule.dto';

describe('SchedulesController', () => {
  let controller: SchedulesController;
  let prisma: DeepMockProxy<PrismaClient>;

  const request: CreateScheduleDto = {
    account_id: 12345,
    agent_id: 98765,
    start_time: new Date(),
    end_time: new Date(),
  };

  const response: Schedule = {
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
    prisma.schedule.create.mockResolvedValueOnce(response);
    expect(controller.create(request)).resolves.toBe(response);
  });

  it('should return a list of schedules', () => {
    prisma.schedule.findMany.mockResolvedValueOnce([response]);
    expect(controller.findAll()).resolves.toStrictEqual([response]);
  });

  it('should return a schedule by id', () => {
    prisma.schedule.findUnique.mockResolvedValueOnce(response);
    expect(controller.findOne('e40fe564-2fb5-47b8-a01a-378d70c9b956')).resolves.toBe(response);
  });

  it('should update a schedule by id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { agent_id, ...rest } = response;
    const updatedResponse = {
      agent_id: 56789,
      ...rest,
    };

    prisma.schedule.update.mockResolvedValueOnce(updatedResponse);
    expect(controller.update('e40fe564-2fb5-47b8-a01a-378d70c9b956', { agent_id: 56789 })).resolves.toBe(
      updatedResponse,
    );
  });

  it('should return a delete a schedule', () => {
    prisma.schedule.delete.mockResolvedValueOnce(response);
    expect(controller.remove('e40fe564-2fb5-47b8-a01a-378d70c9b956')).toBeUndefined();
  });
});
