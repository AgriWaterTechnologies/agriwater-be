import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  execute() {
    return {
      name: process.env?.npm_package_name,
      status: 'OK',
      version: process.env?.npm_package_version,
    };
  }
}
