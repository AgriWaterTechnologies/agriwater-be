import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ExternalModule } from '@/infra/external/external.module';
import { WeatherModule } from './api/weather/weather.module';
import { ForecastModule } from './api/forecast/forecast.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './api/company/company.module';
import { RiverModule } from './api/river/river.module';
import { RegionModule } from './api/region/region.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './infra/iot/mqtt/mqtt.module';

@Module({
  imports: [
    DatabaseModule,
    ExternalModule,
    ForecastModule,
    ConfigModule,
    WeatherModule,
    CompanyModule,
    RiverModule,
    RegionModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
