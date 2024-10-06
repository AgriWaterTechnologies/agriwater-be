import { IsNotEmpty, IsNumber } from 'class-validator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';

export class ForecastShortRequest {
  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lon: number;
}
