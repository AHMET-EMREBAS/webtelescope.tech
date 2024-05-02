import { Dto, Property } from '@webpackages/core';
import { IUpdatePriceLevelDto } from '@webpackages/common';
@Dto()
export class UpdatePriceLevelDto implements IUpdatePriceLevelDto {
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name?: string;
}
