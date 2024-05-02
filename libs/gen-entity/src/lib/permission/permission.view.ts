import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPermissionView } from '@webpackages/gen-model';
import { Permission } from './permission.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('permission.id', 'permissionId')
      .addSelect('permission.name', 'name')

      .from(Permission, 'permission');
  },
})
export class PermissionView implements IPermissionView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
