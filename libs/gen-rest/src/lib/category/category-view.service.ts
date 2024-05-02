import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CategoryView } from '@webpackages/gen-entity';

@Injectable()
export class CategoryViewService extends RepositoryService<CategoryView> {
  constructor(
    @InjectRepository(CategoryView) categoryViewRepo: Repository<CategoryView>
  ) {
    super(categoryViewRepo);
  }
}
