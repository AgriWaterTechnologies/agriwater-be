import { Injectable } from '@nestjs/common';
import { NasaPowerService } from '@/infra/external/apis/nasa-power.service';
import { TemporalDailyRequest } from '../interfaces/temporal-daily.request.interfaces';

@Injectable()
export class TemporalDailyService {
  constructor(private readonly nasaPower: NasaPowerService) {}

  async execute(filters: TemporalDailyRequest) {
    const data = await this.nasaPower.execute(filters);
    return {
      temperatures: Object.keys(data.properties.parameter.T2M).map((key) => ({
        date: key,
        value: data.properties.parameter.T2M[key],
      })),
      precipitations: Object.keys(data.properties.parameter.PRECTOTCORR).map(
        (key) => ({
          date: key,
          value: data.properties.parameter.PRECTOTCORR[key],
        }),
      ),
    };
  }
}
