import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerAddress, CustomerAddressView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerAddressService extends RepositoryService<CustomerAddress> {
  constructor(
    @InjectRepository(CustomerAddress) repo: Repository<CustomerAddress>
  ) {
    super(repo);
  }
}

@Injectable()
export class CustomerAddressViewService extends RepositoryService<CustomerAddressView> {
  constructor(
    @InjectRepository(CustomerAddressView) repo: Repository<CustomerAddressView>
  ) {
    super(repo);
  }
}
