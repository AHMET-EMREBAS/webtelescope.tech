import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateTicketCategoryDto } from '@webpackages/gen-model';
@Dto()
export class UpdateTicketCategoryDto implements IUpdateTicketCategoryDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
