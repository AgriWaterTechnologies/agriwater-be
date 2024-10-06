import { Controller, Get, Query } from '@nestjs/common';
import { ForecastShortService } from '../services/forecast-short.service';
import { ForecastShortRequest } from '../interfaces/forecast-short.request.interfaces';

@Controller('/forecast')
export class ForecastShortController {
  constructor(private readonly forecastShort: ForecastShortService) {}

  @Get('/short')
  async handle(@Query() filters: ForecastShortRequest) {
    return this.forecastShort.execute(filters);
  }
}
