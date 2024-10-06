import { Injectable } from '@nestjs/common';
import { HTTPService } from '@/infra/core/http.service';
import { NasaPowerResponse } from '@/api/weather/interfaces/nasa-power.interfaces';

interface NasaPowerOptions {
  lat: number;
  lon: number;
  sinceDate: string;
  untilDate: string;
}

@Injectable()
export class NasaPowerService extends HTTPService {
  constructor() {
    super('https://power.larc.nasa.gov/api');
  }

  async execute(options: NasaPowerOptions): Promise<NasaPowerResponse> {
    try {
      const { data } = await this.get(`/temporal/daily/point`, {
        params: {
          latitude: options.lat,
          longitude: options.lon,
          parameters: 'T2M,PRECTOT',
          start: options.sinceDate,
          end: options.untilDate,
          format: 'json',
          community: 'AG',
        },
      });

      return data;
    } catch (error) {
      console.error(error.response?.data);
      throw error;
    }
  }
}
