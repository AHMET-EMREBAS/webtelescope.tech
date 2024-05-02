import { Dto, Property, IDDto } from '@webpackages/core';
import { ICreateSkuDto } from '@webpackages/gen-model';
@Dto()
export class CreateSkuDto implements ICreateSkuDto {
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 13,
    inputType: 'text',
    icon: 'barcode',
  })
  barcode!: string;
  @Property({
    type: 'string',
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  sku!: string;
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
    required: true,
    unique: true,
    description: 'Required unique short text',
    minLength: 3,
    maxLength: 100,
    inputType: 'text',
  })
  name!: string;
  @Property({ type: 'string', maxLength: 1000, inputType: 'textarea' })
  description?: string;
  @Property({ type: 'object', objectType: IDDto, required: true })
  product!: IDDto;
}
