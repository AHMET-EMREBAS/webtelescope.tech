import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IRoleView } from '@webpackages/gen-model';
@ViewEntity()
export class RoleView implements IRoleView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() permissionName!: string;
}
