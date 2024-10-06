import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from '@/api/region/interfaces/create-region.interfaces';

@Injectable()
export class RegionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    companyId,
    ...region
  }: CreateRegionDto<string> & {
    centralPoint: string;
  }) {
    return this.prisma.region.create({
      data: {
        name: region.name,
        centralPoint: region.centralPoint,
        coordinates: region.coordinates as string,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        centralPoint: true,
        coordinates: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.region.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        centralPoint: true,
        coordinates: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async list() {
    return this.prisma.region.findMany({
      select: {
        id: true,
        name: true,
        centralPoint: true,
        coordinates: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.region.delete({
      where: {
        id,
      },
    });
  }
}
