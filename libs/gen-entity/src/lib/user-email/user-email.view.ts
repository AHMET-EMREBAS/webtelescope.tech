import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserEmailView } from '@webpackages/common';
@ViewEntity()
export class UserEmailView implements IUserEmailView {
  @ViewColumn() email?: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
