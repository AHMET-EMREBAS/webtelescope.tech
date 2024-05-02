import { Dto, Property } from '@webpackages/core';
import { IUpdateTicketDto } from '@webpackages/common';
@Dto()
export class UpdateTicketDto implements IUpdateTicketDto {
  @Property({ type: 'string', minLength: 3, maxLength: 100, inputType: 'text' })
  title?: string;
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'object', objectType: IDDto }) assignee?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) category?: IDDto;
}
