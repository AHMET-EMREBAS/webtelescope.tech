import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITaskView } from '@webpackages/gen-model';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { Sprint } from '../sprint/sprint.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('task.id', 'taskId')
      .addSelect('task.description', 'description')
      .addSelect('task.checked', 'checked')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .addSelect('sprint.name', 'sprintName')
      .from(Task, 'task')
      .leftJoin(User, 'user', 'user.id = task.userId')
      .leftJoin(Sprint, 'sprint', 'sprint.id = task.sprintId');
  },
})
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
