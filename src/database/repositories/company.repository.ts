import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from '@/api/company/interfaces/create-company.interface';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    return this.prisma.company.create({
      data,
      select: {
        id: true,
        name: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        position: true,
        regions: {
          select: {
            id: true,
            name: true,
            centralPoint: true,
            coordinates: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        rivers: {
          select: {
            id: true,
            name: true,
            height: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async list() {
    return this.prisma.company.findMany({
      select: {
        id: true,
        name: true,
        position: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
