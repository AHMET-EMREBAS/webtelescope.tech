import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Price } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceService extends ResourceService<Price> {
  constructor(@InjectRepository(Price) repo: Repository<Price>) {
    super(repo, ['name'], ['name']);
  }
}
