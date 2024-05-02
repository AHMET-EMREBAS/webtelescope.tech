import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserView } from '@webpackages/gen-model';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { Department } from '../department/department.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('user.id', 'userId')
      .addSelect('user.username', 'username')

      .addSelect('role.name', 'roleName')
      .addSelect('role.description', 'roleDescription')
      .addSelect('department.name', 'departmentName')
      .from(User, 'user')
      .leftJoin('user_roles_role', 'roles', 'roles.userId = user.id')
      .leftJoin(Role, 'role', 'roles.roleId = role.id')
      .leftJoin(Department, 'department', 'department.id = user.departmentId');
  },
})
export class UserView implements IUserView {
  @ViewColumn() username!: string;
  @ViewColumn() roleName!: string;
  @ViewColumn() roleDescription!: string;
  @ViewColumn() departmentName!: string;
}
