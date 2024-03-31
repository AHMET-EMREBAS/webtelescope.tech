import { IID } from '../../common';
import { ITask } from '../../model';

export interface ICreateTaskDto
  extends Pick<
    ITask<IID, IID, IID, IID>,
    | 'assignees'
    | 'difficulty'
    | 'due'
    | 'priority'
    | 'sprint'
    | 'tags'
    | 'status'
    | 'taskDescription'
    | 'taskTitle'
  > {}
