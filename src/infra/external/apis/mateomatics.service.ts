import { Injectable } from '@nestjs/common';
import { HTTPService } from '@/infra/core/http.service';
import { MeteomaticsResponse } from './interfaces/meteomatics.interfaces';
import { ConfigService } from '@/config/config.service';

interface MeteomaticsOptions {
  location: string;
  sinceDate: Date;
  untilDate?: Date;
  parameters?: string;
  format?: string;
}

@Injectable()
export class MeteomaticsService extends HTTPService {
  constructor(private readonly config: ConfigService) {
    super('https://api.meteomatics.com/');
  }

  async execute<T = MeteomaticsResponse>(
    options: MeteomaticsOptions,
    responseType: 'json' | 'arraybuffer' = 'json',
  ): Promise<T> {
    try {
      const location = options.untilDate
        ? `${options.sinceDate.toISOString()}--${options.untilDate.toISOString()}`
        : options.sinceDate.toISOString();
      const { data } = await this.get<T>(
        `${location}/${options.parameters || 't_2m:C'}/${options.location}/${options.format || 'json'}?model=mix`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${this.config.METEOMATICS_USERNAME}:${this.config.METEOMATICS_PASSWORD}`,
            ).toString('base64')}`,
          },
          responseType,
        },
      );

      return data;
    } catch (error) {
      console.error(error.response?.data);
      throw error;
    }
  }
}
