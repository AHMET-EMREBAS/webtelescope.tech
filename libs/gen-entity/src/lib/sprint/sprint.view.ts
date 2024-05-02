import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ISprintView } from '@webpackages/common';
@ViewEntity()
export class SprintView implements ISprintView {
  /**
   * Required unique short text
   */ @ViewColumn() name!: string;
}
