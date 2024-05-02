import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProjectView } from '@webpackages/gen-model';
import { Project } from './project.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('project.id', 'id')
      .addSelect('project.name', 'name')
      .addSelect('project.description', 'description')

      .from(Project, 'project');
  },
})
export class ProjectView extends BaseView implements IProjectView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
}
