import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCompanyParamsDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
