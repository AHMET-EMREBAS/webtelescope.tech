import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserView } from '@webpackages/common';
@ViewEntity()
export class UserView implements IUserView {
  @ViewColumn() username!: string;
  @ViewColumn() password!: string;
  @ViewColumn() roleName!: string;
  @ViewColumn() roleDescription?: string;
  @ViewColumn() departmentName!: string;
}
