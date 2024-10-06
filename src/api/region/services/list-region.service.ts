import { Injectable } from '@nestjs/common';
import { RegionRepository } from '@/database/repositories/region.repository';
import { decodeCoordinates, parseCentralPoint } from '@/common/utils/location';

@Injectable()
export class ListRegionsService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute() {
    const data = await this.regionRepository.list();
    return data.map(({ company, ...region }) => ({
      id: region.id,
      name: region.name,
      centralPoint: parseCentralPoint(region.centralPoint),
      coordinates: decodeCoordinates(region.coordinates),
      company,
    }));
  }
}
