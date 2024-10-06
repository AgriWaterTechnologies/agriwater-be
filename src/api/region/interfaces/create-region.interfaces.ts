import { Coordinates } from '@/common/utils/location';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRegionDto<T = Coordinates[]> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  coordinates: T;

  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  companyId: string;
}
