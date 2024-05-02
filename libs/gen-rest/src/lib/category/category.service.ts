import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Category, CategoryView } from '@webpackages/gen-entity';

@Injectable()
export class CategoryService extends RepositoryService<Category> {
  constructor(@InjectRepository(Category) repo: Repository<Category>) {
    super(repo);
  }
}

@Injectable()
export class CategoryViewService extends RepositoryService<CategoryView> {
  constructor(@InjectRepository(CategoryView) repo: Repository<CategoryView>) {
    super(repo);
  }
}
