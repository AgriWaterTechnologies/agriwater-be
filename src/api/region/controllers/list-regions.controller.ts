import { Controller, Get } from '@nestjs/common';
import { ListRegionsService } from '../services/list-region.service';

@Controller('/regions')
export class ListRegionsController {
  constructor(private readonly listRegions: ListRegionsService) {}

  @Get()
  async handle() {
    return this.listRegions.execute();
  }
}
