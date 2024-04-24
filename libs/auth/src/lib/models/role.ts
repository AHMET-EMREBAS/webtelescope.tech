import {
  Column,
  Entity,
  Many,
  TimestampEntity,
  TimestampEntityView,
  ViewColumn,
  ViewEntity,
} from '@webpackages/core';
import { IRole } from '@webpackages/common';
import { Permission } from './permission';

@Entity()
export class Role extends TimestampEntity implements IRole<Permission> {
  @Column({ type: 'string', unique: true }) name!: string;
  @Many(Permission) permissions!: Permission[];
}

@ViewEntity({
  expression(datasource) {
    return datasource
      .createQueryBuilder()
      .select('r.id', 'id')
      .addSelect('r.name', 'name')
      .addSelect('GROUP_CONCAT(p.name)', 'permissions')
      .addSelect('r.createdAt', 'createdAt')
      .addSelect('r.updatedAt', 'updatedAt')
      .addSelect('r.deletedAt', 'deletedAt')
      .from(Role, 'r')
      .leftJoin('role_permissions_permission', 'rp', 'rp.roleId = r.id')
      .leftJoin(Permission, 'p', 'p.id = rp.permissionId')
      .groupBy('r.name');
  },
})
export class RoleView extends TimestampEntityView {
  @ViewColumn() name!: string;
  @ViewColumn() permissions!: string;
}
