import { Body, Controller, Post } from '@nestjs/common';
import { CreateRegionService } from '../services/create-region.service';
import { CreateRegionDto } from '../interfaces/create-region.interfaces';

@Controller('/regions')
export class CreateRegionController {
  constructor(private readonly createRegion: CreateRegionService) {}

  @Post()
  async handle(@Body() data: CreateRegionDto) {
    return this.createRegion.execute(data);
  }
}
