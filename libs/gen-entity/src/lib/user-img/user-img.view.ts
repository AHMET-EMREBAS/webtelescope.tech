import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserImgView } from '@webpackages/common';
@ViewEntity()
export class UserImgView implements IUserImgView {
  /**
   * Image url
   */ @ViewColumn() url!: string;
  @ViewColumn() description?: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
}
