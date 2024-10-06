import { Injectable } from '@nestjs/common';
import { MeteomaticsService } from '@/infra/external/apis/mateomatics.service';
import {
  Data,
  ForecastRequest,
  ForecastResponse,
} from '../interfaces/forecast.interfaces';

@Injectable()
export class ForecastService {
  constructor(private readonly meteomatics: MeteomaticsService) {}

  async execute(filters: ForecastRequest) {
    const data = await this.meteomatics.execute({
      location: `${filters.lat},${filters.lon}`,
      sinceDate: filters.sinceDate,
      untilDate: filters.untilDate,
      parameters: 't_2m:C,precip_24h:mm,relative_humidity_2m:p',
    });

    const groupedData = data.data.flatMap((param) => {
      const parameter = param.parameter;

      return param.coordinates.flatMap((coord) => {
        return coord.dates.map((entry) => {
          const dateKey = entry.date;
          const hour = dateKey.split('T')[1].split('Z')[0];
          const date = dateKey.split('T')[0];

          return {
            date,
            hour: hour,
            value: entry.value,
            parameter: parameter,
          };
        });
      });
    });

    return groupedData.reduce((acc, item) => {
      let entry = acc.find((e) => e.date === item.date);
      if (!entry) {
        entry = { date: item.date, data: [] };
        acc.push(entry);
      }

      const dataEntry: Data = {
        hour: item.hour,
        temperature: item.parameter === 't_2m:C' ? item.value : null,
        precipitation: item.parameter === 'precip_24h:mm' ? item.value : null,
        humidity:
          item.parameter === 'relative_humidity_2m:p' ? item.value : null,
      };

      const existingData = entry.data.find((d) => d.hour === dataEntry.hour);
      if (existingData) {
        existingData.temperature =
          dataEntry.temperature !== null
            ? dataEntry.temperature
            : existingData.temperature;
        existingData.precipitation =
          dataEntry.precipitation !== null
            ? dataEntry.precipitation
            : existingData.precipitation;
        existingData.humidity =
          dataEntry.humidity !== null
            ? dataEntry.humidity
            : existingData.humidity;
      } else {
        entry.data.push(dataEntry);
      }

      return acc;
    }, [] as ForecastResponse[]);
  }
}
