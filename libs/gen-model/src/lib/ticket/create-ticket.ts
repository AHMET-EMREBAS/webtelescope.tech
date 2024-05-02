import { IID } from '@webpackages/common';
export interface ICreateTicketDto {
  title: string;
  description: string;
  user?: IID;
  ticketCategory?: IID;
}
