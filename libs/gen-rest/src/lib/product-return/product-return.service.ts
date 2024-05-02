import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { ProductReturn, ProductReturnView } from '@webpackages/gen-entity';

@Injectable()
export class ProductReturnService extends RepositoryService<ProductReturn> {
  constructor(
    @InjectRepository(ProductReturn) repo: Repository<ProductReturn>
  ) {
    super(repo);
  }
}

@Injectable()
export class ProductReturnViewService extends RepositoryService<ProductReturnView> {
  constructor(
    @InjectRepository(ProductReturnView) repo: Repository<ProductReturnView>
  ) {
    super(repo);
  }
}
