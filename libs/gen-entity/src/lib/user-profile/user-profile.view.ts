import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserProfileView } from '@webpackages/gen-model';
import { UserProfile } from './user-profile.entity';
import { User } from '../user/user.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userProfile.id', 'userProfileId')
      .addSelect('userProfile.firstName', 'firstName')
      .addSelect('userProfile.lastName', 'lastName')

      .addSelect('user.username', 'userUsername')
      .from(UserProfile, 'userProfile')
      .leftJoin(User, 'user', 'user.id = userProfile.userId');
  },
})
export class UserProfileView implements IUserProfileView {
  @ViewColumn() firstName!: string;
  @ViewColumn() lastName!: string;
  @ViewColumn() userUsername!: string;
}
