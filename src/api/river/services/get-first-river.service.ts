import { Injectable } from '@nestjs/common';
import { RiverRepository } from '@/database/repositories/river.repository';

@Injectable()
export class GetFirstRiverService {
  constructor(private readonly riverRepository: RiverRepository) {}

  async execute() {
    return this.riverRepository.findFirst();
  }
}
