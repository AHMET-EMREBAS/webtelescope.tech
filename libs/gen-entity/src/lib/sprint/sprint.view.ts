import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISprintView } from '@webpackages/gen-model';
import { Sprint } from './sprint.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('sprint.id', 'sprintId')
      .addSelect('sprint.name', 'name')

      .from(Sprint, 'sprint');
  },
})
export class SprintView implements ISprintView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
