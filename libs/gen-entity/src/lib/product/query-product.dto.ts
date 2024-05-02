import { Dto, Property, IDDto } from '@webpackages/core';
import { IQueryProductDto } from '@webpackages/gen-model';
@Dto()
export class QueryProductDto implements IQueryProductDto {
  @Property({
    type: 'string',
    minLength: 10,
    maxLength: 13,
    inputType: 'text',
    icon: 'barcode',
  })
  barcode?: string;
  /**
   * Required unique short text
   */ @Property({
    type: 'string',
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
  @Property({ type: 'string' }) categoryName?: string;
  @Property({ type: 'string' }) departmentName?: string;
}
