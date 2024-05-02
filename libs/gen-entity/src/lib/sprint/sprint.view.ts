import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISprintView } from '@webpackages/gen-model';
import { Sprint } from './sprint.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('sprint.id', 'id')
      .addSelect('sprint.name', 'name')

      .from(Sprint, 'sprint');
  },
})
export class SprintView extends BaseView implements ISprintView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
