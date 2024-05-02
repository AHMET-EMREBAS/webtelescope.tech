import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserPhone } from '@webpackages/gen-entity';

@Injectable()
export class UserPhoneService extends RepositoryService<UserPhone> {
  constructor(@InjectRepository(UserPhone) repo: Repository<UserPhone>) {
    super(repo);
  }
}
