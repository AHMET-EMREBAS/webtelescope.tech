import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Permission, PermissionView } from '@webpackages/gen-entity';

@Injectable()
export class PermissionService extends RepositoryService<Permission> {
  constructor(@InjectRepository(Permission) repo: Repository<Permission>) {
    super(repo);
  }
}

@Injectable()
export class PermissionViewService extends RepositoryService<PermissionView> {
  constructor(
    @InjectRepository(PermissionView) repo: Repository<PermissionView>
  ) {
    super(repo);
  }
}
