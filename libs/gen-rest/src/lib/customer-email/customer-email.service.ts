import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerEmail, CustomerEmailView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerEmailService extends RepositoryService<CustomerEmail> {
  constructor(
    @InjectRepository(CustomerEmail) repo: Repository<CustomerEmail>
  ) {
    super(repo);
  }
}

@Injectable()
export class CustomerEmailViewService extends RepositoryService<CustomerEmailView> {
  constructor(
    @InjectRepository(CustomerEmailView) repo: Repository<CustomerEmailView>
  ) {
    super(repo);
  }
}
