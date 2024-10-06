import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFactory } from './infra/core/interceptors/validation-exception-factory.interceptor';
import { ApplicationExceptionFilter } from './infra/core/errors/application-exception-filter';
import { ValidationExceptionFilter } from './infra/core/errors/validation-exception.filter';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors({
    origin: ['http://localhost:5173', config.FRONTEND_URL],
  });

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

  await app.listen(config.API_PORT || 3000);
}
bootstrap();
