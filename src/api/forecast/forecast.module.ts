import { Module } from '@nestjs/common';
import { ForecastController } from './controllers/forecast.controller';
import { ForecastShortController } from './controllers/forecast-short.controller';
import { ForecastImageController } from './controllers/forecast-image.controller';
import { ForecastShortService } from './services/forecast-short.service';
import { OpenWeatherMapService } from '@/infra/external/apis/open-weather-map.service';
import { ForecastService } from './services/forecast.service';
import { MeteomaticsService } from '@/infra/external/apis/mateomatics.service';
import { ForecastImageService } from './services/forecast-image.service';

@Module({
  providers: [
    ForecastService,
    ForecastImageService,
    ForecastShortService,
    OpenWeatherMapService,
    MeteomaticsService,
  ],
  controllers: [
    ForecastController,
    ForecastImageController,
    ForecastShortController,
  ],
})
export class ForecastModule {}
