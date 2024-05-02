import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITaskView } from '@webpackages/common';
@ViewEntity()
export class TaskView implements ITaskView {
  @ViewColumn() title!: string;
  @ViewColumn() description?: string;
  @ViewColumn() difficulty?: string;
  @ViewColumn() due?: date;
  @ViewColumn() startDate?: date;
  @ViewColumn() endDate?: date;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() sprintName!: string;
}
