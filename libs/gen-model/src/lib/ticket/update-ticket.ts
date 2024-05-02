import { IID } from '@webpackages/common';
export interface IUpdateTicketDto {
  title?: string;
  description?: string;
  user?: IID;
  ticketCategory?: IID;
}
