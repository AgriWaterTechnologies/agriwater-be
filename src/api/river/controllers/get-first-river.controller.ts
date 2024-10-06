import { Controller, Get } from '@nestjs/common';
import { GetFirstRiverService } from '../services/get-first-river.service';

@Controller('/rivers')
export class GetFirstRiverController {
  constructor(private readonly getFirstRiver: GetFirstRiverService) {}

  @Get('/first')
  async handle() {
    return this.getFirstRiver.execute();
  }
}
