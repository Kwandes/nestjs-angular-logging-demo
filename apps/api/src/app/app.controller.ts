import { BadRequestException, Controller, Get } from '@nestjs/common';

import { Message } from '@logging-demo/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('Error')
  error() {
    throw new BadRequestException('A bad request example');
  }
}
