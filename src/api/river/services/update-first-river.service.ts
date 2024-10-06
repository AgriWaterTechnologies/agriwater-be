import { Injectable } from '@nestjs/common';
import { RiverRepository } from '@/database/repositories/river.repository';
import { UpdateRiverDto } from '../interfaces/update-river.interfaces';

@Injectable()
export class UpdateFirstRiverService {
  constructor(private readonly riverRepository: RiverRepository) {}

  async execute(data: UpdateRiverDto) {
    return this.riverRepository.updateFirst(data);
  }
}
