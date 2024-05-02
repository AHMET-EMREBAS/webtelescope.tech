import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Task, TaskView } from '@webpackages/gen-entity';

@Injectable()
export class TaskService extends RepositoryService<Task> {
  constructor(@InjectRepository(Task) repo: Repository<Task>) {
    super(repo);
  }
}

@Injectable()
export class TaskViewService extends RepositoryService<TaskView> {
  constructor(@InjectRepository(TaskView) repo: Repository<TaskView>) {
    super(repo);
  }
}
