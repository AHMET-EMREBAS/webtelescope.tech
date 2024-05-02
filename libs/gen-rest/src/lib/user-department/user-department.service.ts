import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserDepartment } from '@webpackages/gen-entity';

@Injectable()
export class UserDepartmentService extends RepositoryService<UserDepartment> {
  constructor(
    @InjectRepository(UserDepartment) repo: Repository<UserDepartment>
  ) {
    super(repo);
  }
}
