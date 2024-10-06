import { Module } from '@nestjs/common';
import { CreateCompanyService } from './services/create-company.service';
import { GetCompanyService } from './services/get-company.service';
import { ListCompaniesService } from './services/list-companies.service';
import { CreateCompanyController } from './controllers/create-company.controller';
import { GetCompanyController } from './controllers/get-company.controller';
import { ListCompaniesController } from './controllers/list-companies.controller';
import { CompanyRepository } from '@/database/repositories/company.repository';

@Module({
  providers: [
    CompanyRepository,
    CreateCompanyService,
    GetCompanyService,
    ListCompaniesService,
  ],
  controllers: [
    CreateCompanyController,
    GetCompanyController,
    ListCompaniesController,
  ],
})
export class CompanyModule {}
