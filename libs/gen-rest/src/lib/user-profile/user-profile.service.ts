import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { UserProfile } from '@webpackages/gen-entity';

@Injectable()
export class UserProfileService extends RepositoryService<UserProfile> {
  constructor(@InjectRepository(UserProfile) repo: Repository<UserProfile>) {
    super(repo);
  }
}
