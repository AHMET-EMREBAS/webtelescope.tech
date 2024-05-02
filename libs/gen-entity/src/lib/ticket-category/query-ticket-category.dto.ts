import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTicketCategoryDto } from '@webpackages/gen-model';
@Dto()
export class QueryTicketCategoryDto implements IQueryTicketCategoryDto {
  /**
   * Required unique short text
   */
  @Property({ description: 'Required unique short text' }) name?: string;
}
