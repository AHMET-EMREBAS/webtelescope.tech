import { IID } from '@webpackages/common';
export interface ITicket<TUser = IID, TTicketCategory = IID> {
  title: string;
  description: string;
  user?: TUser;
  ticketCategory?: TTicketCategory;
}
