import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IDepartmentView } from '@webpackages/gen-model';
import { Department } from './department.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('department.id', 'departmentId')
      .addSelect('department.description', 'description')
      .addSelect('department.checked', 'checked')

      .from(Department, 'department');
  },
})
export class DepartmentView implements IDepartmentView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
