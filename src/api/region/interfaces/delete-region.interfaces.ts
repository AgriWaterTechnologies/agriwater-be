import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteRegionParamsDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
