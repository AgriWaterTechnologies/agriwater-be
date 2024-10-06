import { Injectable } from '@nestjs/common';
import { HTTPService } from '@/infra/core/http.service';
import { ConfigService } from '@/config/config.service';
import { OpenWeatherForecastResponse } from '@/api/forecast/interfaces/open-weather-map.interfaces';

interface OpenWeatherMapForecastOptions {
  lat: number;
  lon: number;
}

@Injectable()
export class OpenWeatherMapService extends HTTPService {
  constructor(private readonly config: ConfigService) {
    super(`https://api.openweathermap.org`);
  }

  async forecast(
    options: OpenWeatherMapForecastOptions,
  ): Promise<OpenWeatherForecastResponse> {
    try {
      const { data } = await this.get(
        `/data/2.5/forecast?appid=${this.config.OPEN_WEATHER_MAP_API_KEY}&units=metric`,
        { params: options },
      );

      return data;
    } catch (error) {
      console.error(error.response?.data);
      throw error;
    }
  }
}
