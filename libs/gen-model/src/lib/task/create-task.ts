import { IID } from '@webpackages/common';
export interface ICreateTaskDto {
  title: string;
  description?: string;
  difficulty?: string;
  due?: Date;
  startDate?: Date;
  endDate?: Date;
  user?: IID;
  sprint?: IID;
}
