import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ExternalModule } from '@/infra/external/external.module';
import { WeatherModule } from './api/weather/weather.module';
import { ForecastModule } from './api/forecast/forecast.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ExternalModule, ForecastModule, ConfigModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
