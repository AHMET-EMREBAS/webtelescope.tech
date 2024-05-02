import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserDepartmentView } from '@webpackages/gen-model';
import { UserDepartment } from './user-department.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userDepartment.id', 'id')
      .addSelect('userDepartment.name', 'name')

      .from(UserDepartment, 'userDepartment');
  },
})
export class UserDepartmentView
  extends BaseView
  implements IUserDepartmentView
{
  @ViewColumn() name!: string;
}
