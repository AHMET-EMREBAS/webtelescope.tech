import { IID } from '@webpackages/common';
export interface ITask<TUser = IID, TSprint = IID> {
  title: string;
  description?: string;
  difficulty?: string;
  due?: Date;
  startDate?: Date;
  endDate?: Date;
  user?: TUser;
  sprint?: TSprint;
}
