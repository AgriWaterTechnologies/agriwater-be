import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { ParseNumber } from '@/infra/core/decorators/parse-number.decorator';

export class CreateRiverDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @ParseNumber()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  companyId: string;
}
