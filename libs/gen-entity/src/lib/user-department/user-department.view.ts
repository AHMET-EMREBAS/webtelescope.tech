import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IUserDepartmentView } from '@webpackages/gen-model';
import { UserDepartment } from './user-department.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('userDepartment.id', 'userDepartmentId')
      .addSelect('userDepartment.name', 'name')

      .from(UserDepartment, 'userDepartment');
  },
})
export class UserDepartmentView implements IUserDepartmentView {
  @ViewColumn() name!: string;
}
