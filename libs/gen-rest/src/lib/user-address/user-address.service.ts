import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserAddress, UserAddressView } from '@webpackages/gen-entity';

@Injectable()
export class UserAddressService extends RepositoryService<UserAddress> {
  constructor(@InjectRepository(UserAddress) repo: Repository<UserAddress>) {
    super(repo);
  }
}

@Injectable()
export class UserAddressViewService extends RepositoryService<UserAddressView> {
  constructor(
    @InjectRepository(UserAddressView) repo: Repository<UserAddressView>
  ) {
    super(repo);
  }
}
