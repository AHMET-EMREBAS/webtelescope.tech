import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Product, ProductView } from '@webpackages/gen-entity';

@Injectable()
export class ProductService extends RepositoryService<Product> {
  constructor(@InjectRepository(Product) repo: Repository<Product>) {
    super(repo);
  }
}

@Injectable()
export class ProductViewService extends RepositoryService<ProductView> {
  constructor(@InjectRepository(ProductView) repo: Repository<ProductView>) {
    super(repo);
  }
}
