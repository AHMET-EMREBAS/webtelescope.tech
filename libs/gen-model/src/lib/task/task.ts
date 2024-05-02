import { IID } from '@webpackages/common';
export interface ITask<TUser, TSprint> {
  title: string;
  description?: string;
  difficulty?: string;
  due?: Date;
  startDate?: Date;
  endDate?: Date;
  assignees?: TUser;
  sprint?: TSprint;
}
