import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketCategoryView } from '@webpackages/gen-model';
import { TicketCategory } from './ticket-category.entity';
import { BaseView } from '@webpackages/core';
@ViewEntity({
  expression(ds) {
    return ds
      .createQueryBuilder()
      .select('ticketCategory.id', 'id')
      .addSelect('ticketCategory.name', 'name')

      .from(TicketCategory, 'ticketCategory');
  },
})
export class TicketCategoryView
  extends BaseView
  implements ITicketCategoryView
{
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
