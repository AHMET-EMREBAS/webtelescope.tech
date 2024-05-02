import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserAddress } from '@webpackages/gen-entity';

@Injectable()
export class UserAddressService extends RepositoryService<UserAddress> {
  constructor(@InjectRepository(UserAddress) repo: Repository<UserAddress>) {
    super(repo);
  }
}
