import { Controller, Get, Query } from '@nestjs/common';
import { TemporalDailyService } from '../services/temporal-daily.service';
import { TemporalDailyRequest } from '../interfaces/temporal-daily.request.interfaces';

@Controller('/weather/temporal/daily')
export class TemporalDailyController {
  constructor(private readonly temporalDaily: TemporalDailyService) {}

  @Get()
  async handle(@Query() filters: TemporalDailyRequest) {
    return this.temporalDaily.execute(filters);
  }
}
