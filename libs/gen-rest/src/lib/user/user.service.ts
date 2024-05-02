import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { User, UserView } from '@webpackages/gen-entity';

@Injectable()
export class UserService extends RepositoryService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
}

@Injectable()
export class UserViewService extends RepositoryService<UserView> {
  constructor(@InjectRepository(UserView) repo: Repository<UserView>) {
    super(repo);
  }
}
