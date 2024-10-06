import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@/database/repositories/company.repository';

@Injectable()
export class ListCompaniesService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute() {
    return this.companyRepository.list();
  }
}
