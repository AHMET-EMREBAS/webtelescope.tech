import { ViewEntity, ViewColumn } from '@webpackages/core';
import { IDepartmentView } from '@webpackages/gen-model';
@ViewEntity()
export class DepartmentView implements IDepartmentView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
