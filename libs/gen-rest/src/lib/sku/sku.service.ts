import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Sku, SkuView } from '@webpackages/gen-entity';

@Injectable()
export class SkuService extends RepositoryService<Sku> {
  constructor(@InjectRepository(Sku) repo: Repository<Sku>) {
    super(repo);
  }
}

@Injectable()
export class SkuViewService extends RepositoryService<SkuView> {
  constructor(@InjectRepository(SkuView) repo: Repository<SkuView>) {
    super(repo);
  }
}
