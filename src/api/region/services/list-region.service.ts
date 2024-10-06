import { Injectable } from '@nestjs/common';
import { RegionRepository } from '@/database/repositories/region.repository';

@Injectable()
export class ListRegionsService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute() {
    return this.regionRepository.list();
  }
}
