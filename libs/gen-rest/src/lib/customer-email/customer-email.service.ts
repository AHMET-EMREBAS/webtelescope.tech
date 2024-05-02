import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerEmail } from '@webpackages/gen-entity';

@Injectable()
export class CustomerEmailService extends RepositoryService<CustomerEmail> {
  constructor(
    @InjectRepository(CustomerEmail) repo: Repository<CustomerEmail>
  ) {
    super(repo);
  }
}
