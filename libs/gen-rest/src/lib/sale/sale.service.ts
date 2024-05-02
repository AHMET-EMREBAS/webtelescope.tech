import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Sale, SaleView } from '@webpackages/gen-entity';

@Injectable()
export class SaleService extends RepositoryService<Sale> {
  constructor(@InjectRepository(Sale) repo: Repository<Sale>) {
    super(repo);
  }
}

@Injectable()
export class SaleViewService extends RepositoryService<SaleView> {
  constructor(@InjectRepository(SaleView) repo: Repository<SaleView>) {
    super(repo);
  }
}
