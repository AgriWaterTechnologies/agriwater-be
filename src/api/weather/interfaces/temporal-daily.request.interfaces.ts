import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';

export class TemporalDailyRequest {
  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsString()
  sinceDate: string;

  @IsNotEmpty()
  @IsString()
  untilDate: string;
}
