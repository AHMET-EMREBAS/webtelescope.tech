import { IID } from '@webpackages/common';
export interface ITicket {
  title: string;
  description: string;
  assignee?: TUser;
  category?: TTicketCategory;
}
