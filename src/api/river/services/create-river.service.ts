import { Injectable } from '@nestjs/common';
import { RiverRepository } from '@/database/repositories/river.repository';
import { CreateRiverDto } from '../interfaces/create-river.interfaces';

@Injectable()
export class CreateRiverService {
  constructor(private readonly riverRepository: RiverRepository) {}

  async execute(data: CreateRiverDto) {
    return this.riverRepository.create(data);
  }
}
