import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Quantity } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuantityService extends ResourceService<Quantity> {
  constructor(@InjectRepository(Quantity) repo: Repository<Quantity>) {
    super(repo, ['name'], ['name']);
  }
}
