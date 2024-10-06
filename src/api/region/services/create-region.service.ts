import { Injectable } from '@nestjs/common';
import { encodeCoordinates, getCentralPoint } from '@/common/utils/location';
import { RegionRepository } from '@/database/repositories/region.repository';
import { CreateRegionDto } from '../interfaces/create-region.interfaces';

@Injectable()
export class CreateRegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async execute({ name, coordinates, companyId }: CreateRegionDto) {
    const centralPoint = getCentralPoint(coordinates);
    const data: CreateRegionDto<string> & {
      centralPoint: string;
    } = {
      name,
      companyId,
      coordinates: encodeCoordinates(coordinates),
      centralPoint: JSON.stringify([centralPoint.lat, centralPoint.lon]),
    };

    return this.regionRepository.create(data);
  }
}
