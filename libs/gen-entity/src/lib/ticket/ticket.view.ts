import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketView } from '@webpackages/common';
@ViewEntity()
export class TicketView implements ITicketView {
  @ViewColumn() title!: string;
  @ViewColumn() description!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() ticketCategoryName!: string;
}
