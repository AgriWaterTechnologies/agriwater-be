import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRiverDto } from '@/api/river/interfaces/create-river.interfaces';
import { UpdateRiverDto } from '@/api/river/interfaces/update-river.interfaces';

@Injectable()
export class RiverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ companyId, ...river }: CreateRiverDto) {
    return this.prisma.river.create({
      data: {
        name: river.name,
        height: river.height,
        company: {
          connect: {
            id: companyId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        height: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
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

  async findFirst() {
    return this.prisma.river.findFirst({
      select: {
        id: true,
        name: true,
        height: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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

  async update(id: string, data: UpdateRiverDto) {
    return this.prisma.river.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        height: data.height,
      },
      select: {
        id: true,
        name: true,
        height: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateFirst(id: string, data: UpdateRiverDto) {
    const firstRiver = await this.findFirst();
    return this.prisma.river.update({
      where: {
        id: firstRiver.id,
      },
      data: {
        name: data.name,
        height: data.height,
      },
      select: {
        id: true,
        name: true,
        height: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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
