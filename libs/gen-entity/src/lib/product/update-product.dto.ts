import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateProductDto } from '@webpackages/gen-model';
@Dto()
export class UpdateProductDto implements IUpdateProductDto {
  @Property({
    type: 'string',
    unique: true,
    minLength: 10,
    maxLength: 13,
    inputType: 'text',
    icon: 'barcode',
  })
  barcode?: string;
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
  @Property({
    type: 'string',
    maxLength: 1000,
    inputType: 'textarea',
    icon: 'description',
  })
  description?: string;
  @Property({ type: 'object', objectType: IDDto, isArray: true })
  category?: IDDto[];
  @Property({ type: 'object', objectType: IDDto }) department?: IDDto;
}
