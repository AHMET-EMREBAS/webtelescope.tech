import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPermissionView } from '@webpackages/common';
@ViewEntity()
export class PermissionView implements IPermissionView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
