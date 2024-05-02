import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerAddress } from '@webpackages/gen-entity';

@Injectable()
export class CustomerAddressService extends RepositoryService<CustomerAddress> {
  constructor(
    @InjectRepository(CustomerAddress) repo: Repository<CustomerAddress>
  ) {
    super(repo);
  }
}
