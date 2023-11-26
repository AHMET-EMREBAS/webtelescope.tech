import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { PriceLevel } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceLevelService extends ResourceService<PriceLevel> {
  constructor(@InjectRepository(PriceLevel) repo: Repository<PriceLevel>) {
    super(repo, ['name'], ['name']);
  }
}
