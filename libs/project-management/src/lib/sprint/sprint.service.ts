import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Sprint } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SprintService extends ResourceService<Sprint> {
  constructor(@InjectRepository(Sprint) repo: Repository<Sprint>) {
    super(repo, ['name'], ['name']);
  }
}
