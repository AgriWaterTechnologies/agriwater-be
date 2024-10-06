import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFactory } from './infra/core/interceptors/validation-exception-factory.interceptor';
import { ApplicationExceptionFilter } from './infra/core/errors/application-exception-filter';
import { ValidationExceptionFilter } from './infra/core/errors/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* Pipes globais */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      exceptionFactory: ValidationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new ApplicationExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(3000);
}
bootstrap();
