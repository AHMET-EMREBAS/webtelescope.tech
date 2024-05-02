import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserProfileView } from '@webpackages/gen-model';
import { UserProfile } from './user-profile.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userProfile.id', 'userProfileId')
      .addSelect('userProfile.firstName', 'firstName')
      .addSelect('userProfile.lastName', 'lastName')

      .from(UserProfile, 'userProfile');
  },
})
export class UserProfileView implements IUserProfileView {
  @ViewColumn() firstName!: string;
  @ViewColumn() lastName!: string;
}
