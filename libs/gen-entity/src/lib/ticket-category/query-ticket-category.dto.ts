import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryTicketCategoryDto } from '@webpackages/gen-model';
@Dto()
export class QueryTicketCategoryDto implements IQueryTicketCategoryDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
