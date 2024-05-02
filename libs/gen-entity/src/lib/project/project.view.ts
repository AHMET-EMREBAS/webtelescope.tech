import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IProjectView } from '@webpackages/common';
@ViewEntity()
export class ProjectView implements IProjectView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
  @ViewColumn() description?: string;
}
