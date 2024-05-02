import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTicketDto } from '@webpackages/gen-model';
@Dto()
export class QueryTicketDto implements IQueryTicketDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  title?: string;
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'string' }) userUsername?: string;
  @Property({ type: 'string' }) userPassword?: string;
  @Property({ type: 'string' }) ticketCategoryName?: string;
}
