import { IID } from '@webpackages/common';
export interface ITask<TUser, TSprint> {
  title: string;
  description?: string;
  difficulty?: string;
  due?: date;
  startDate?: date;
  endDate?: date;
  assignees?: TUser;
  createdBy?: TUser;
  sprint?: TSprint;
}
