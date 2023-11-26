import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Sku } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SkuService extends ResourceService<Sku> {
  constructor(@InjectRepository(Sku) repo: Repository<Sku>) {
    super(repo, ['name'], ['name']);
  }
}
