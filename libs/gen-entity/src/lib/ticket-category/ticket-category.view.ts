import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketCategoryView } from '@webpackages/gen-model';
import { TicketCategory } from './ticket-category.entity';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('ticketCategory.id', 'ticketCategoryId')
      .addSelect('ticketCategory.description', 'description')
      .addSelect('ticketCategory.checked', 'checked')

      .from(TicketCategory, 'ticketCategory');
  },
})
export class TicketCategoryView implements ITicketCategoryView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
