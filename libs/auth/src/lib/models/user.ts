import {
  Column,
  Entity,
  Many,
  TimestampEntity,
  TimestampEntityView,
  ViewColumn,
  ViewEntity,
} from '@webpackages/core';
import { Role, RoleView } from './role';
import { IUser, IUserView } from '@webpackages/common';
import { Scope } from './scope';

@Entity()
export class User extends TimestampEntity implements IUser {
  @Column({ type: 'string', unique: true }) username!: string;
  @Column({ type: 'string' }) password!: string;
  @Many(Role) roles?: Role[];
  @Many(Scope) scopes?: Scope[];
}

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('u.id', 'id')
      .addSelect('u.username', 'username')
      .addSelect('GROUP_CONCAT(r.name)', 'roles')
      .addSelect('GROUP_CONCAT(r.permissions)', 'permissions')
      .from(User, 'u')
      .leftJoin('user_roles_role', 'ur', 'ur.userId = u.id')
      .leftJoin(RoleView, 'r', 'r.id = ur.roleId')
      .groupBy('u.id');
  },
})
export class UserRoleView {
  @ViewColumn() id!: number;
  @ViewColumn() roles!: string;
  @ViewColumn() permissions!: string;
}

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('u.id', 'id')
      .addSelect('u.username', 'username')
      .addSelect('GROUP_CONCAT(s.name)', 'scopes')
      .from(User, 'u')
      .leftJoin('user_scopes_scope', 'us', 'us.userId = u.id')
      .leftJoin(Scope, 's', 's.id = us.scopeId')
      .groupBy('u.id');
  },
})
export class UserScopeView {
  @ViewColumn() id!: number;
  @ViewColumn() username!: string;
  @ViewColumn() scopes!: string;
}

@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('u.id', 'id')
      .addSelect('u.username', 'username')
      .addSelect('u.password', 'password')
      .addSelect('u.createdAt', 'createdAt')
      .addSelect('u.updatedAt', 'updatedAt')
      .addSelect('u.deletedAt', 'deletedAt')
      .addSelect('GROUP_CONCAT(ur.permissions)', 'permissions')
      .addSelect('GROUP_CONCAT(ur.roles)', 'roles')
      .addSelect('GROUP_CONCAT(us.scopes)', 'scopes')
      .from(User, 'u')
      .leftJoin(UserRoleView, 'ur', 'ur.id = u.id')
      .leftJoin(UserScopeView, 'us', 'us.id = u.id')
      .groupBy('u.id');
  },
})
export class UserView extends TimestampEntityView implements IUserView {
  @ViewColumn() username!: string;
  @ViewColumn() password!: string;
  @ViewColumn() roles?: string | undefined;
  @ViewColumn() permissions?: string | undefined;
  @ViewColumn() scopes?: string | undefined;
}
