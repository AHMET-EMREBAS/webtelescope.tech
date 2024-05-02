import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserPhone, UserPhoneView } from '@webpackages/gen-entity';

@Injectable()
export class UserPhoneService extends RepositoryService<UserPhone> {
  constructor(@InjectRepository(UserPhone) repo: Repository<UserPhone>) {
    super(repo);
  }
}

@Injectable()
export class UserPhoneViewService extends RepositoryService<UserPhoneView> {
  constructor(
    @InjectRepository(UserPhoneView) repo: Repository<UserPhoneView>
  ) {
    super(repo);
  }
}
