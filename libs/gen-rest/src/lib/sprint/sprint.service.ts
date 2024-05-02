import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Sprint, SprintView } from '@webpackages/gen-entity';

@Injectable()
export class SprintService extends RepositoryService<Sprint> {
  constructor(@InjectRepository(Sprint) repo: Repository<Sprint>) {
    super(repo);
  }
}

@Injectable()
export class SprintViewService extends RepositoryService<SprintView> {
  constructor(@InjectRepository(SprintView) repo: Repository<SprintView>) {
    super(repo);
  }
}
