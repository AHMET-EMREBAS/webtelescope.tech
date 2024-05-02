import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserProfileView } from '@webpackages/common';
@ViewEntity()
export class UserProfileView implements IUserProfileView {
  @ViewColumn() firstName?: string;
  @ViewColumn() lastName?: string;
}
