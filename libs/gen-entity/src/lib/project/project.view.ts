import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProjectView } from '@webpackages/gen-model';
import { Project } from './project.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('project.id', 'projectId')
      .addSelect('project.description', 'description')
      .addSelect('project.checked', 'checked')

      .from(Project, 'project');
  },
})
export class ProjectView implements IProjectView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
  @ViewColumn() description!: string;
}
