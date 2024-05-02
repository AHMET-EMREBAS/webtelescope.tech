import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IPermissionView } from '@webpackages/gen-model';
import { Permission } from './permission.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('permission.id', 'id')
      .addSelect('permission.name', 'name')

      .from(Permission, 'permission');
  },
})
export class PermissionView extends BaseView implements IPermissionView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
