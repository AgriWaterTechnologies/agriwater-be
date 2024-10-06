import { Injectable } from '@nestjs/common';
import { OpenWeatherMapService } from '@/infra/external/apis/open-weather-map.service';
import { ForecastShortRequest } from '../interfaces/forecast-short.request.interfaces';

@Injectable()
export class ForecastShortService {
  constructor(private readonly openWeather: OpenWeatherMapService) {}

  async execute(filters: ForecastShortRequest) {
    const data = await this.openWeather.forecast(filters);
    const dates = data.list.reduce((acc, item) => {
      const key = item.dt_txt.split(/\s/)[0];
      const index = acc.findIndex((i) => i.date === key);
      const data = {
        hour: item.dt_txt.split(/\s/)[1],
        temp: {
          min: item.main.temp_min,
          max: item.main.temp_max,
          current: item.main.temp,
          feelsLike: item.main.feels_like,
        },
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
        precipitation: {
          probability: item.pop,
          volume: item.rain?.['3h'],
        },
        weather: {
          title: item.weather[0].main,
          description: item.weather[0].description,
        },
      };

      if (index === -1) {
        acc.push({
          date: key,
          data: [data],
        });

        return acc;
      }

      acc[index].data.push(data);
      return acc;
    }, []);

    return {
      city: data.city.name,
      country: data.city.country,
      sunrise: data.city.sunrise,
      sunset: data.city.sunset,
      timezone: data.city.timezone,
      dates,
    };
  }
}
