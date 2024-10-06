import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@/database/repositories/company.repository';

@Injectable()
export class GetCompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string) {
    return this.companyRepository.findOne(id);
  }
}
