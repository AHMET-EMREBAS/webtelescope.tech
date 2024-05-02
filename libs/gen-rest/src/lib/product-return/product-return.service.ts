import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { ProductReturn } from '@webpackages/gen-entity';

@Injectable()
export class ProductReturnService extends RepositoryService<ProductReturn> {
  constructor(
    @InjectRepository(ProductReturn) repo: Repository<ProductReturn>
  ) {
    super(repo);
  }
}
