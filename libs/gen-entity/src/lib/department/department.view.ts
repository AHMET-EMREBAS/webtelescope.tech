import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IDepartmentView } from '@webpackages/gen-model';
import { Department } from './department.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('department.id', 'id')
      .addSelect('department.name', 'name')

      .from(Department, 'department');
  },
})
export class DepartmentView extends BaseView implements IDepartmentView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
