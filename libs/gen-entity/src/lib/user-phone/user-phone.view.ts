import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserPhoneView } from '@webpackages/gen-model';
@ViewEntity()
export class UserPhoneView implements IUserPhoneView {
  @ViewColumn() email!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
