import { IID } from '@webpackages/common';
export interface ITaskView extends IID {
  title: string;
  description: string;
  difficulty: string;
  due: Date;
  startDate: Date;
  endDate: Date;
  userUsername: string;
  sprintName: string;
}
