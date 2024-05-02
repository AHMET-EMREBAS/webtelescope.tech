import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserView } from '@webpackages/gen-model';
import { User } from './user.entity';
import { BaseView } from '@webpackages/core';
import { Role } from '../role/role.entity';
import { UserDepartment } from '../user-department/user-department.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('user.id', 'id')
      .addSelect('user.username', 'username')

      .addSelect('role.name', 'roleName')
      .addSelect('role.description', 'roleDescription')
      .addSelect('userDepartment.name', 'userDepartmentName')
      .from(User, 'user')
      .leftJoin('user_roles_role', 'roles', 'roles.userId = user.id')
      .leftJoin(Role, 'role', 'roles.roleId = role.id')
      .leftJoin(
        UserDepartment,
        'userDepartment',
        'userDepartment.id = user.userDepartmentId'
      );
  },
})
export class UserView extends BaseView implements IUserView {
  @ViewColumn() username!: string;
  @ViewColumn() roleName!: string;
  @ViewColumn() roleDescription!: string;
  @ViewColumn() userDepartmentName!: string;
}
