import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Project } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService extends ResourceService<Project> {
  constructor(@InjectRepository(Project) repo: Repository<Project>) {
    super(repo, ['name'], ['name']);
  }
}
