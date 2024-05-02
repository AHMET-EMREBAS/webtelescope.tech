import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerPhone, CustomerPhoneView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerPhoneService extends RepositoryService<CustomerPhone> {
  constructor(
    @InjectRepository(CustomerPhone) repo: Repository<CustomerPhone>
  ) {
    super(repo);
  }
}

@Injectable()
export class CustomerPhoneViewService extends RepositoryService<CustomerPhoneView> {
  constructor(
    @InjectRepository(CustomerPhoneView) repo: Repository<CustomerPhoneView>
  ) {
    super(repo);
  }
}
