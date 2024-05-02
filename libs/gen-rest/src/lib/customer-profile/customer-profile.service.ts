import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerProfile, CustomerProfileView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerProfileService extends RepositoryService<CustomerProfile> {
  constructor(
    @InjectRepository(CustomerProfile) repo: Repository<CustomerProfile>
  ) {
    super(repo);
  }
}

@Injectable()
export class CustomerProfileViewService extends RepositoryService<CustomerProfileView> {
  constructor(
    @InjectRepository(CustomerProfileView) repo: Repository<CustomerProfileView>
  ) {
    super(repo);
  }
}
