import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserDepartment, UserDepartmentView } from '@webpackages/gen-entity';

@Injectable()
export class UserDepartmentService extends RepositoryService<UserDepartment> {
  constructor(
    @InjectRepository(UserDepartment) repo: Repository<UserDepartment>
  ) {
    super(repo);
  }
}

@Injectable()
export class UserDepartmentViewService extends RepositoryService<UserDepartmentView> {
  constructor(
    @InjectRepository(UserDepartmentView) repo: Repository<UserDepartmentView>
  ) {
    super(repo);
  }
}
