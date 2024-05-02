import { Dto, Property, IDDto } from '@webpackages/core';
import { IUpdateSkuDto } from '@webpackages/gen-model';
@Dto()
export class UpdateSkuDto implements IUpdateSkuDto {
  @Property({
    type: 'string',
    unique: true,
    minLength: 10,
    maxLength: 13,
    inputType: 'text',
    icon: 'barcode',
  })
  barcode?: string;
  @Property({
    type: 'string',
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  sku?: string;
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
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'object', objectType: IDDto }) product?: IDDto;
}
