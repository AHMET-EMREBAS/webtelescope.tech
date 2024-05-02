import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Project, ProjectView } from '@webpackages/gen-entity';

@Injectable()
export class ProjectService extends RepositoryService<Project> {
  constructor(@InjectRepository(Project) repo: Repository<Project>) {
    super(repo);
  }
}

@Injectable()
export class ProjectViewService extends RepositoryService<ProjectView> {
  constructor(@InjectRepository(ProjectView) repo: Repository<ProjectView>) {
    super(repo);
  }
}
