import { Controller, Get } from '@nestjs/common';
import { ListCompaniesService } from '../services/list-companies.service';

@Controller('/companies')
export class ListCompaniesController {
  constructor(private readonly listCompanies: ListCompaniesService) {}

  @Get()
  async handle() {
    return this.listCompanies.execute();
  }
}
