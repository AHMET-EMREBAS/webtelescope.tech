import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerPhone } from '@webpackages/gen-entity';

@Injectable()
export class CustomerPhoneService extends RepositoryService<CustomerPhone> {
  constructor(
    @InjectRepository(CustomerPhone) repo: Repository<CustomerPhone>
  ) {
    super(repo);
  }
}
