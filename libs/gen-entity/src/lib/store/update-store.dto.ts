import { Dto, Property } from '@webpackages/core';
import { IUpdateStoreDto } from '@webpackages/common';
@Dto()
export class UpdateStoreDto implements IUpdateStoreDto {
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
