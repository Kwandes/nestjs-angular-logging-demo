import { Body, Controller, Get, Post } from '@nestjs/common';
import { BottlesService } from './bottles.service';

@Controller('bottles')
export class BottleController {
  constructor(private readonly bottlesService: BottlesService) {}

  @Get()
  getBottles() {
    return this.bottlesService.getBottles();
  }

  @Post()
  createBottle(@Body() bottle: { brand: string; capacity: string }) {
    return this.bottlesService.createBottle(bottle);
  }
}
