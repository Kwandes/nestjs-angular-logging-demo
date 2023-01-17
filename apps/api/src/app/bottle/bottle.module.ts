import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bottle } from '../models/bottle.entity';
import { BottleController } from './bottles.controller';
import { BottlesService } from './bottles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bottle])],
  providers: [BottlesService],
  controllers: [BottleController],
  exports: [BottlesService],
})
export class BottlesModule {}
