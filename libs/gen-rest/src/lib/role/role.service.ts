import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Role, RoleView } from '@webpackages/gen-entity';

@Injectable()
export class RoleService extends RepositoryService<Role> {
  constructor(@InjectRepository(Role) repo: Repository<Role>) {
    super(repo);
  }
}

@Injectable()
export class RoleViewService extends RepositoryService<RoleView> {
  constructor(@InjectRepository(RoleView) repo: Repository<RoleView>) {
    super(repo);
  }
}
