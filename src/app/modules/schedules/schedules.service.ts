import { Injectable } from '@nestjs/common';
import { Schedule, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ScheduleCreateInput): Promise<Schedule> {
    return this.prisma.schedule.create({
      data,
    });
  }

  async findAll(): Promise<Schedule[]> {
    return this.prisma.schedule.findMany();
  }

  async findOne(params: {
    where: Prisma.ScheduleWhereUniqueInput;
    include: Prisma.ScheduleInclude;
  }): Promise<Schedule | null> {
    const { where, include } = params;
    return this.prisma.schedule.findUnique({
      where,
      include,
    });
  }

  async update(params: {
    where: Prisma.ScheduleWhereUniqueInput;
    data: Prisma.ScheduleUpdateInput;
  }): Promise<Schedule> {
    const { data, where } = params;
    return this.prisma.schedule.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ScheduleWhereUniqueInput): Promise<Schedule> {
    return this.prisma.schedule.delete({
      where,
    });
  }
}
