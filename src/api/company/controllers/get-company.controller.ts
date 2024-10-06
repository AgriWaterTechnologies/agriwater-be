import { Controller, Get, Param } from '@nestjs/common';
import { GetCompanyParamsDto } from '../interfaces/get-company.interface';
import { GetCompanyService } from '../services/get-company.service';

@Controller('/companies')
export class GetCompanyController {
  constructor(private readonly getCompany: GetCompanyService) {}

  @Get('/:id')
  handle(@Param() { id }: GetCompanyParamsDto) {
    return this.getCompany.execute(id);
  }
}
