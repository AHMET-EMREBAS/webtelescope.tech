import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Department, DepartmentView } from '@webpackages/gen-entity';

@Injectable()
export class DepartmentService extends RepositoryService<Department> {
  constructor(@InjectRepository(Department) repo: Repository<Department>) {
    super(repo);
  }
}

@Injectable()
export class DepartmentViewService extends RepositoryService<DepartmentView> {
  constructor(
    @InjectRepository(DepartmentView) repo: Repository<DepartmentView>
  ) {
    super(repo);
  }
}
