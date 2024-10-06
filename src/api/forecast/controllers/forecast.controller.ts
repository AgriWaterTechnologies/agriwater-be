import { Controller, Get, Query } from '@nestjs/common';
import { ForecastService } from '../services/forecast.service';
import { ForecastRequest } from '../interfaces/forecast.interfaces';

@Controller('/forecast')
export class ForecastController {
  constructor(private readonly forecast: ForecastService) {}

  @Get()
  async handle(@Query() filters: ForecastRequest) {
    return this.forecast.execute(filters);
  }
}
