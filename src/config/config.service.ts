import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly config: NestConfigService) {}

  get OPEN_WEATHER_MAP_API_KEY(): string {
    return this.config.get<string>('OPEN_WEATHER_MAP_API_KEY');
  }

  get METEOMATICS_USERNAME(): string {
    return this.config.get<string>('METEOMATICS_USERNAME');
  }

  get METEOMATICS_PASSWORD(): string {
    return this.config.get<string>('METEOMATICS_PASSWORD');
  }
}
