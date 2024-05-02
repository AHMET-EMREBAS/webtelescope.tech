import { IID } from '@webpackages/common';
export interface ITicket<TUser, TTicketCategory> {
  title: string;
  description: string;
  assignee?: TUser;
  category?: TTicketCategory;
}
