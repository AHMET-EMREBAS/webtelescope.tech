import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IRoleView } from '@webpackages/gen-model';
import { Role } from './role.entity';
import { Permission } from '../permission/permission.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('role.id', 'roleId')
      .addSelect('role.name', 'name')
      .addSelect('role.description', 'description')

      .addSelect('permission.name', 'permissionName')
      .from(Role, 'role')
      .leftJoin(
        'role_permissions_permission',
        'permissions',
        'permissions.roleId = role.id'
      )
      .leftJoin(
        Permission,
        'permission',
        'permissions.permissionId = permission.id'
      );
  },
})
export class RoleView implements IRoleView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
  @ViewColumn() permissionName!: string;
}