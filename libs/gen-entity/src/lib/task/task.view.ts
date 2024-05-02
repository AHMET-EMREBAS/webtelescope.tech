import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITaskView } from '@webpackages/gen-model';
@ViewEntity()
export class TaskView implements ITaskView {
  @ViewColumn() title!: string;
  @ViewColumn() description!: string;
  @ViewColumn() difficulty!: string;
  @ViewColumn() due!: Date;
  @ViewColumn() startDate!: Date;
  @ViewColumn() endDate!: Date;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() sprintName!: string;
}
