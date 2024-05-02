import { ViewEntity, ViewColumn } from '@webpackages/core';
import { ITicketCategoryView } from '@webpackages/gen-model';
@ViewEntity()
export class TicketCategoryView implements ITicketCategoryView {
  /**
   * Required unique short text
   */
  @ViewColumn() name!: string;
}
