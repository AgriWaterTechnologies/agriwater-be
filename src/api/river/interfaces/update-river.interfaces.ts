import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';

export class UpdateRiverDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ParseNumber()
  @IsNumber()
  height: number;
}
