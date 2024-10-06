import { Injectable } from '@nestjs/common';
import { RegionRepository } from '@/database/repositories/region.repository';

@Injectable()
export class DeleteRegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute(id: string) {
    return this.regionRepository.delete(id);
  }
}
