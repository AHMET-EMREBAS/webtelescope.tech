import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Permission } from '@webpackages/gen-entity';

@Injectable()
export class PermissionService extends RepositoryService<Permission> {
  constructor(@InjectRepository(Permission) repo: Repository<Permission>) {
    super(repo);
  }
}
