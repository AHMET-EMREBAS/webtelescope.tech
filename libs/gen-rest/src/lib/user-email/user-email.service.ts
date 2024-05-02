import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserEmail } from '@webpackages/gen-entity';

@Injectable()
export class UserEmailService extends RepositoryService<UserEmail> {
  constructor(@InjectRepository(UserEmail) repo: Repository<UserEmail>) {
    super(repo);
  }
}
