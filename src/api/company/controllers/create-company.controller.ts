import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompanyService } from '../services/create-company.service';
import { CreateCompanyDto } from '../interfaces/create-company.interface';

@Controller('/companies')
export class CreateCompanyController {
  constructor(private readonly createCompany: CreateCompanyService) {}

  @Post()
  async handle(@Body() data: CreateCompanyDto) {
    return this.createCompany.execute(data);
  }
}
