import { IID } from '@webpackages/common';
export interface ICreateTicketDto {
  title: string;
  description: string;
  assignee?: IID;
  category?: IID;
}
