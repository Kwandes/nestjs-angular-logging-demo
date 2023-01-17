import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bottle } from '../models/bottle.entity';

@Injectable()
export class BottlesService {
  constructor(
    @InjectRepository(Bottle)
    private readonly bottlesRepo: Repository<Bottle>
  ) {}

  getBottles() {
    return this.bottlesRepo.find();
  }

  createBottle(bottle: { brand: string; capacity: string }) {
    return this.bottlesRepo.save(bottle);
  }
}
