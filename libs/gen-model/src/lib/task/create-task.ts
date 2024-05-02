import { IID } from '@webpackages/common';
export interface ICreateTaskDto {
  title: string;
  description?: string;
  difficulty?: string;
  due?: date;
  startDate?: date;
  endDate?: date;
  assignees?: IID;
  createdBy?: IID;
  sprint?: IID;
}
