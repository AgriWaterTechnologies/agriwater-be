import { Body, Controller, Post } from '@nestjs/common';
import { CreateRiverService } from '../services/create-river.service';
import { CreateRiverDto } from '../interfaces/create-river.interfaces';

@Controller('/rivers')
export class CreateRiverController {
  constructor(private readonly createRiver: CreateRiverService) {}

  @Post()
  async handle(@Body() data: CreateRiverDto) {
    return this.createRiver.execute(data);
  }
}
