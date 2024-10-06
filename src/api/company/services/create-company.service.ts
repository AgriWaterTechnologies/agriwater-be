import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@/database/repositories/company.repository';
import { CreateCompanyDto } from '../interfaces/create-company.interface';

@Injectable()
export class CreateCompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyDto) {
    return this.companyRepository.create(data);
  }
}
