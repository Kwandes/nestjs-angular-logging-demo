import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BottlesModule } from './bottle/bottle.module';
import { configService } from './config/config.service';
import { SentryInterceptor } from './interceptors/sentry.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../.env', '.env'] }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    BottlesModule,
  ],
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
