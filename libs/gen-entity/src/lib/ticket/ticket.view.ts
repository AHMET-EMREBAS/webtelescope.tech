import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketView } from '@webpackages/gen-model';
import { Ticket } from './ticket.entity';
import { User } from '../user/user.entity';
import { TicketCategory } from '../ticket-category/ticket-category.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('ticket.id', 'ticketId')
      .addSelect('ticket.description', 'description')
      .addSelect('ticket.checked', 'checked')
      .addSelect('user.username', 'userUsername')
      .addSelect('user.password', 'userPassword')
      .addSelect('ticketCategory.name', 'ticketCategoryName')
      .from(Ticket, 'ticket')
      .leftJoin(User, 'user', 'user.id = ticket.userId')
      .leftJoin(
        TicketCategory,
        'ticketCategory',
        'ticketCategory.id = ticket.ticketCategoryId'
      );
  },
})
export class TicketView implements ITicketView {
  @ViewColumn() title!: string;
  @ViewColumn() description!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() userPassword!: string;
  @ViewColumn() ticketCategoryName!: string;
}
