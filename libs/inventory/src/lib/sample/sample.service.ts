import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/core';
import { Sample } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleService extends ResourceService<Sample> {
  constructor(@InjectRepository(Sample) repo: Repository<Sample>) {
    super(repo, ['name'], ['name']);
  }
}
