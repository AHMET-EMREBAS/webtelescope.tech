import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateStoreDto } from '@webpackages/gen-model';
@Dto()
export class CreateStoreDto implements ICreateStoreDto {
  /**
   * Required unique short text
   */
  @Property({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
}
