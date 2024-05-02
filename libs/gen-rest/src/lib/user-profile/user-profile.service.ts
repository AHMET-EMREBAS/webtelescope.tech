import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserProfile, UserProfileView } from '@webpackages/gen-entity';

@Injectable()
export class UserProfileService extends RepositoryService<UserProfile> {
  constructor(@InjectRepository(UserProfile) repo: Repository<UserProfile>) {
    super(repo);
  }
}

@Injectable()
export class UserProfileViewService extends RepositoryService<UserProfileView> {
  constructor(
    @InjectRepository(UserProfileView) repo: Repository<UserProfileView>
  ) {
    super(repo);
  }
}
