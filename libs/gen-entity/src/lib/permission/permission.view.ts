import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPermissionView } from '@webpackages/gen-model';
@ViewEntity()
export class PermissionView implements IPermissionView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
