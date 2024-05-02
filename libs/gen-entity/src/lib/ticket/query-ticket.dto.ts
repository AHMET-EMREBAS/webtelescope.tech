import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTicketDto } from '@webpackages/gen-model';
@Dto()
export class QueryTicketDto implements IQueryTicketDto {
  @Property({}) title?: string;
  @Property({}) description?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) ticketCategoryName?: string;
}
