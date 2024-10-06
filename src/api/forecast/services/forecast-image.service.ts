import { Injectable } from '@nestjs/common';
import { MeteomaticsService } from '@/infra/external/apis/mateomatics.service';
import { ForecastImageRequest } from '../interfaces/forecast-image.request.interface';
import { generateBoundingBox } from '@/common/utils/location';

@Injectable()
export class ForecastImageService {
  constructor(private readonly meteomatics: MeteomaticsService) {}

  async execute({
    type,
    dimensions,
    date,
    offset,
    ...coordinates
  }: ForecastImageRequest) {
    const boundingBox = generateBoundingBox(coordinates, offset);
    const parameter = {
      temperature: 't_2m:C',
      precipitation: 'precip_24h:mm',
    };

    return this.meteomatics.execute<Buffer>(
      {
        sinceDate: date,
        location: `${boundingBox.topLeft.lat},${boundingBox.topLeft.lon}_${boundingBox.bottomRight.lat},${boundingBox.bottomRight.lon}:${dimensions || '800x600'}`,
        format: 'png',
        parameters: parameter[type],
      },
      'arraybuffer',
    );
  }
}
