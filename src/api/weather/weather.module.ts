import { Module } from '@nestjs/common';
import { TemporalDailyController } from './controllers/temporal-daily.controller';
import { TemporalDailyService } from './services/temporal-daily.service';
import { NasaPowerService } from '@/infra/external/apis/nasa-power.service';

@Module({
  providers: [NasaPowerService, TemporalDailyService],
  controllers: [TemporalDailyController],
})
export class WeatherModule {}
