import { IID } from '@webpackages/common';
export interface ITicketView extends IID {
  title: string;
  description: string;
  userUsername: string;
  ticketCategoryName: string;
}
