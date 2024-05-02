import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateTicketDto } from '@webpackages/gen-model';
@Dto()
export class CreateTicketDto implements ICreateTicketDto {
  @Property({
    type: 'string',
    required: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  title!: string;
  @Property({
    type: 'string',
    required: true,
    maxLength: 1000,
    inputType: 'textarea',
  })
  description!: string;
  @Property({ type: 'object', objectType: IDDto }) assignee?: IDDto;
  @Property({ type: 'object', objectType: IDDto }) category?: IDDto;
}
