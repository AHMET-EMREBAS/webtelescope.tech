import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserImg } from '@webpackages/gen-entity';

@Injectable()
export class UserImgService extends RepositoryService<UserImg> {
  constructor(@InjectRepository(UserImg) repo: Repository<UserImg>) {
    super(repo);
  }
}
