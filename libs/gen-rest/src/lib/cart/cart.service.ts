import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Cart, CartView } from '@webpackages/gen-entity';

@Injectable()
export class CartService extends RepositoryService<Cart> {
  constructor(@InjectRepository(Cart) repo: Repository<Cart>) {
    super(repo);
  }
}

@Injectable()
export class CartViewService extends RepositoryService<CartView> {
  constructor(@InjectRepository(CartView) repo: Repository<CartView>) {
    super(repo);
  }
}
