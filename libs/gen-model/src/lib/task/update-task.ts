import { IID } from '@webpackages/common';
export interface IUpdateTaskDto {
  title?: string;
  description?: string;
  difficulty?: string;
  due?: date;
  startDate?: date;
  endDate?: date;
  assignees?: IID;
  createdBy?: IID;
  sprint?: IID;
}
