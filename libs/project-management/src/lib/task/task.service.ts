import { InjectRepository } from '@nestjs/typeorm';
import { ResourceService } from '@webpackages/rest';
import { Task } from './entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService extends ResourceService<Task> {
  constructor(@InjectRepository(Task) repo: Repository<Task>) {
    super(repo, ['name'], ['name']);
  }
}
