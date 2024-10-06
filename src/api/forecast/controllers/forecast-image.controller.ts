import { Controller, Get, Query, Res } from '@nestjs/common';
import { ForecastImageService } from '../services/forecast-image.service';
import { ForecastImageRequest } from '../interfaces/forecast-image.request.interface';
import { Response } from 'express';

@Controller('/forecast')
export class ForecastImageController {
  constructor(private readonly forecastImage: ForecastImageService) {}

  @Get('/image')
  async handle(
    @Res() response: Response,
    @Query() filters: ForecastImageRequest,
  ) {
    const image = await this.forecastImage.execute(filters);

    response.setHeader('Content-Type', 'image/png');
    response.setHeader('Content-Length', image.length);
    response.setHeader(
      'Content-Disposition',
      `${
        filters.download ? 'attachment' : 'inline'
      }; filename=${filters.lat.toString().replace(/\d/, '')}${filters.lon.toString().replace(/\d/, '')}.png`,
    );

    return response.send(image);
  }
}
