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
      .addSelect('user.description', 'description')
      .addSelect('user.checked', 'checked')
      .addSelect('role.name', 'roleName')
      .addSelect('role.description', 'roleDescription')
      .addSelect('department.name', 'departmentName')
      .from(User, 'user')
      .leftJoin(Role, 'role', 'role.id = user.roleId')
      .leftJoin(Department, 'department', 'department.id = user.departmentId');
  },
})
export class UserView implements IUserView {
  @ViewColumn() username!: string;
  @ViewColumn() password!: string;
  @ViewColumn() roleName!: string;
  @ViewColumn() roleDescription!: string;
  @ViewColumn() departmentName!: string;
}
