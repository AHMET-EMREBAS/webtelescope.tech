import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerProfile } from '@webpackages/gen-entity';

@Injectable()
export class CustomerProfileService extends RepositoryService<CustomerProfile> {
  constructor(
    @InjectRepository(CustomerProfile) repo: Repository<CustomerProfile>
  ) {
    super(repo);
  }
}
