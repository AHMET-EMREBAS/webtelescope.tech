import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Store } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService extends ResourceService<Store> {
  constructor(@InjectRepository(Store) repo: Repository<Store>) {
    super(repo, ['name'], ['name']);
  }
}
