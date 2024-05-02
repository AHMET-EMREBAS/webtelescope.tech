import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketView } from '@webpackages/gen-model';
import { Ticket } from './ticket.entity';
import { BaseView } from '@webpackages/core';
import { User } from '../user/user.entity';
import { TicketCategory } from '../ticket-category/ticket-category.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('ticket.id', 'id')
      .addSelect('ticket.title', 'title')
      .addSelect('ticket.description', 'description')

      .addSelect('user.username', 'userUsername')
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
export class TicketView extends BaseView implements ITicketView {
  @ViewColumn() title!: string;
  @ViewColumn() description!: string;
  @ViewColumn() userUsername!: string;
  @ViewColumn() ticketCategoryName!: string;
}
