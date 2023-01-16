import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as Sentry from '@sentry/node';
import { SentryConfig } from './app/sentry.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Request body validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // Strip data of properties without decorators
      whitelist: true,
      // Throw an error if non-whitelisted values are provided
      forbidNonWhitelisted: true,
      // Throw an error if unknown values are provided
      forbidUnknownValues: true,
    })
  );

  Sentry.init({
    dsn: SentryConfig.dsn,
    environment: SentryConfig.env,
    tracesSampleRate: 1.0,
  });
  Logger.log(`Sentry initialized in environnement ${SentryConfig.env}`);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
