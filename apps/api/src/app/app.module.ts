import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import '@sentry/tracing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentryInterceptor } from './interceptors/sentry.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SentryInterceptor,
    },
  ],
})
export class AppModule {}
