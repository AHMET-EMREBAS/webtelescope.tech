import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProjectView } from '@webpackages/gen-model';
import { Project } from './project.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('project.id', 'projectId')
      .addSelect('project.name', 'name')
      .addSelect('project.description', 'description')

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
