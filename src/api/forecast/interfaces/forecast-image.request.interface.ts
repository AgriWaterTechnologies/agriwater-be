import { ParseBoolean } from '@/infra/core/decorators/parse-boolean.decorator';
import { ParseDate } from '@/infra/core/decorators/parse-date.decorator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ForecastImageRequest {
  @IsNotEmpty()
  @IsString()
  @IsEnum(['temperature', 'precipitation'])
  type: string;

  @IsOptional()
  @IsString()
  dimensions: string;

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
  date: Date;

  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  offset: number;

  @IsOptional()
  @ParseBoolean()
  @IsBoolean()
  download?: boolean;
}
