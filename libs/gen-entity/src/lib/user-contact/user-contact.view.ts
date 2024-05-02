import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserContactView } from '@webpackages/gen-model';
@ViewEntity()
export class UserContactView implements IUserContactView {
  @ViewColumn() state!: string;
  @ViewColumn() city!: string;
  @ViewColumn() street!: string;
  @ViewColumn() zip!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
