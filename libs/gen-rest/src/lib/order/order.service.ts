import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Order, OrderView } from '@webpackages/gen-entity';

@Injectable()
export class OrderService extends RepositoryService<Order> {
  constructor(@InjectRepository(Order) repo: Repository<Order>) {
    super(repo);
  }
}

@Injectable()
export class OrderViewService extends RepositoryService<OrderView> {
  constructor(@InjectRepository(OrderView) repo: Repository<OrderView>) {
    super(repo);
  }
}
