import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserEmail, UserEmailView } from '@webpackages/gen-entity';

@Injectable()
export class UserEmailService extends RepositoryService<UserEmail> {
  constructor(@InjectRepository(UserEmail) repo: Repository<UserEmail>) {
    super(repo);
  }
}

@Injectable()
export class UserEmailViewService extends RepositoryService<UserEmailView> {
  constructor(
    @InjectRepository(UserEmailView) repo: Repository<UserEmailView>
  ) {
    super(repo);
  }
}
