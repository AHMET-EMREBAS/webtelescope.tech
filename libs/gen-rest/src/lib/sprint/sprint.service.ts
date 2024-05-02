import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Sprint } from '@webpackages/gen-entity';

@Injectable()
export class SprintService extends RepositoryService<Sprint> {
  constructor(@InjectRepository(Sprint) repo: Repository<Sprint>) {
    super(repo);
  }
}
