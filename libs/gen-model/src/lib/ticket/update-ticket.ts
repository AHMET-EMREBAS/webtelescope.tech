import { IID } from '@webpackages/common';
export interface IUpdateTicketDto {
  title?: string;
  description?: string;
  assignee?: IID;
  category?: IID;
}
