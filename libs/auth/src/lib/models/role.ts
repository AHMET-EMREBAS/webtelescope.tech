import {
  Column,
  Entity,
  Many,
  TimestampEntity,
  ViewColumn,
  ViewEntity,
} from '@webpackages/core';
import { IRole, IRoleView } from '@webpackages/common';
import { Permission } from './permission';

@Entity()
export class Role extends TimestampEntity implements IRole<Permission> {
  @Column({ type: 'string', unique: true }) name!: string;
  @Many(Permission) permissions!: Permission[];
}

@ViewEntity({
  expression(datasource) {
    return datasource.createQueryBuilder().select().from(Role, 'main');
  },
})
export class RoleView implements IRoleView {
  @ViewColumn() name!: string;
  @ViewColumn() permissions!: string;
}
