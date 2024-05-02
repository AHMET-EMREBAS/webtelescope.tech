import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Customer, CustomerView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerService extends RepositoryService<Customer> {
  constructor(@InjectRepository(Customer) repo: Repository<Customer>) {
    super(repo);
  }
}

@Injectable()
export class CustomerViewService extends RepositoryService<CustomerView> {
  constructor(@InjectRepository(CustomerView) repo: Repository<CustomerView>) {
    super(repo);
  }
}
