import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Task } from '@webpackages/gen-entity';

@Injectable()
export class TaskService extends RepositoryService<Task> {
  constructor(@InjectRepository(Task) repo: Repository<Task>) {
    super(repo);
  }
}
