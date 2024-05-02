import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserImg, UserImgView } from '@webpackages/gen-entity';

@Injectable()
export class UserImgService extends RepositoryService<UserImg> {
  constructor(@InjectRepository(UserImg) repo: Repository<UserImg>) {
    super(repo);
  }
}

@Injectable()
export class UserImgViewService extends RepositoryService<UserImgView> {
  constructor(@InjectRepository(UserImgView) repo: Repository<UserImgView>) {
    super(repo);
  }
}
