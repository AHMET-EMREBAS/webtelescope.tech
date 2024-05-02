import { IID } from '@webpackages/common';
export interface ITicket<TUser, TTicketCategory> {
  title: string;
  description: string;
  user?: TUser;
  ticketCategory?: TTicketCategory;
}
