import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Store, StoreView } from '@webpackages/gen-entity';

@Injectable()
export class StoreService extends RepositoryService<Store> {
  constructor(@InjectRepository(Store) repo: Repository<Store>) {
    super(repo);
  }
}

@Injectable()
export class StoreViewService extends RepositoryService<StoreView> {
  constructor(@InjectRepository(StoreView) repo: Repository<StoreView>) {
    super(repo);
  }
}
