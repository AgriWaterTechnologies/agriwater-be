import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';
import { ParseDate } from '@/infra/core/decorators/parse-date.decorator';

export class ForecastRequest {
  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @ParseDate()
  @IsDate()
  sinceDate: Date;

  @IsNotEmpty()
  @ParseDate()
  @IsDate()
  untilDate: Date;
}

export interface ForecastResponse {
  date: string;
  data: Data[];
}

export interface Data {
  hour: string;
  temperature: number;
  precipitation: number;
  humidity: number;
}
